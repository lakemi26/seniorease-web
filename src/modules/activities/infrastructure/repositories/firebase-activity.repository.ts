import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseFirestore } from '@/infrastructure/firebase/firebase.firestore'
import type { IActivityRepository, ActivityFilters, Unsubscribe } from '../../domain/repositories'
import type { Activity, CreateActivityInput, WeeklySummary } from '../../domain/entities'
import { mapActivityDocument, mapActivityDocuments, toFirestoreCreateDocument } from '../mappers/activity.mapper'
import type { ActivityDocument } from '../mappers/types'

export function createFirebaseActivityRepository(): IActivityRepository {
  function getDb() {
    return getFirebaseFirestore()
  }

  async function create(input: CreateActivityInput): Promise<Activity> {
    const db = getDb()
    const ref = collection(db, 'activities')
    const docData = toFirestoreCreateDocument(input)
    const docRef = await addDoc(ref, docData)
    const snapshot = await getDocs(
      query(collection(db, 'activities'), where('__name__', '==', docRef.id), limit(1))
    )
    const raw = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as ActivityDocument
    return mapActivityDocument(raw)
  }

  function subscribeByUser(
    uid: string,
    filters: ActivityFilters,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const db = getDb()
    const ref = collection(db, 'activities')
    const constraints = [where('userId', '==', uid), orderBy('scheduledAt', 'asc'), limit(50)]
    const q = query(ref, ...constraints)

    return onSnapshot(
      q,
      (snapshot) => {
        const allDocs = snapshot.docs.map((d) => {
          const data = { id: d.id, ...d.data() } as ActivityDocument
          return data
        })
        const activities = mapActivityDocuments(allDocs)

        const filtered = activities.filter((a) => {
          if (filters.status && filters.status !== 'all' && a.status !== filters.status) return false
          if (filters.category && filters.category !== 'all' && a.category !== filters.category) return false
          if (filters.period) {
            const now = new Date()
            const startOfDay = new Date(now)
            startOfDay.setHours(0, 0, 0, 0)
            const endOfDay = new Date(now)
            endOfDay.setHours(23, 59, 59, 999)
            if (filters.period === 'today' && (a.scheduledAt < startOfDay || a.scheduledAt > endOfDay)) return false
            if (filters.period === 'upcoming' && a.scheduledAt < now) return false
            if (filters.period === 'completed' && a.status !== 'completed') return false
          }
          if (filters.search) {
            const q = filters.search.toLowerCase()
            if (!a.title.toLowerCase().includes(q)) return false
          }
          return true
        })

        onData(filtered)
      },
      (error) => {
        onError?.(error)
      }
    )
  }

  function subscribeToNextActivity(
    uid: string,
    onData: (activity: Activity | null) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const db = getDb()
    const ref = collection(db, 'activities')
    const q = query(
      ref,
      where('userId', '==', uid),
      where('status', '==', 'pending'),
      orderBy('scheduledAt', 'asc'),
      limit(1)
    )

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onData(null)
          return
        }
        const doc = snapshot.docs[0]
        const data = { id: doc.id, ...doc.data() } as ActivityDocument
        onData(mapActivityDocument(data))
      },
      (error) => {
        onError?.(error)
      }
    )
  }

  function subscribeToTodayActivities(
    uid: string,
    startOfDay: Date,
    endOfDay: Date,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const db = getDb()
    const ref = collection(db, 'activities')
    const q = query(
      ref,
      where('userId', '==', uid),
      where('scheduledAt', '>=', Timestamp.fromDate(startOfDay)),
      where('scheduledAt', '<=', Timestamp.fromDate(endOfDay)),
      orderBy('scheduledAt', 'asc'),
      limit(50)
    )

    return onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => {
          const data = { id: d.id, ...d.data() } as ActivityDocument
          return data
        })
        const filtered = docs.filter((d) => d.status !== 'cancelled')
        onData(mapActivityDocuments(filtered))
      },
      (error) => {
        onError?.(error)
      }
    )
  }

  function subscribeToInProgressActivities(
    uid: string,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const db = getDb()
    const ref = collection(db, 'activities')
    const q = query(
      ref,
      where('userId', '==', uid),
      where('status', '==', 'inProgress'),
      limit(3)
    )

    return onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => {
          const data = { id: d.id, ...d.data() } as ActivityDocument
          return data
        })
        onData(mapActivityDocuments(docs))
      },
      (error) => {
        onError?.(error)
      }
    )
  }

  function subscribeToRecentCompletedActivities(
    uid: string,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const db = getDb()
    const ref = collection(db, 'activities')
    const q = query(
      ref,
      where('userId', '==', uid),
      where('status', '==', 'completed'),
      orderBy('completedAt', 'desc'),
      limit(5)
    )

    return onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => {
          const data = { id: d.id, ...d.data() } as ActivityDocument
          return data
        })
        onData(mapActivityDocuments(docs))
      },
      (error) => {
        onError?.(error)
      }
    )
  }

  async function getWeeklySummary(uid: string): Promise<WeeklySummary> {
    const db = getDb()
    const ref = collection(db, 'activities')

    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 7)

    const q = query(
      ref,
      where('userId', '==', uid),
      where('updatedAt', '>=', Timestamp.fromDate(startOfWeek)),
      where('updatedAt', '<=', Timestamp.fromDate(endOfWeek))
    )

    const snapshot = await getDocs(q)
    const total = snapshot.size
    let completed = 0
    let pending = 0
    let inProgress = 0

    snapshot.forEach((d) => {
      const data = d.data() as ActivityDocument
      if (data.status === 'completed') completed++
      else if (data.status === 'pending') pending++
      else if (data.status === 'inProgress') inProgress++
    })

    return { total, completed, pending, inProgress }
  }

  return {
    create,
    subscribeByUser,
    subscribeToNextActivity,
    subscribeToTodayActivities,
    subscribeToInProgressActivities,
    subscribeToRecentCompletedActivities,
    getWeeklySummary,
  }
}
