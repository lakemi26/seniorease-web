'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import { PreferencesContext } from '@/presentation/providers/PreferencesProvider'
import type { Activity } from '@/modules/activities/domain/entities'
import type { ReminderNotification, NotificationStatus } from '../types'
import { OVERDUE_WINDOW_MS } from '../types'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

const repository = createFirebaseActivityRepository()
const useCases = createActivityUseCases(repository)

function classifyNotification(remindAt: Date, now: Date): NotificationStatus {
  if (remindAt > now) return 'upcoming'
  if (now.getTime() - remindAt.getTime() <= OVERDUE_WINDOW_MS) return 'due'
  return 'overdue'
}

function buildNotification(activity: Activity, now: Date): ReminderNotification {
  const remindAt = activity.reminder.remindAt ?? activity.scheduledAt
  const status = classifyNotification(remindAt, now)

  let message: string
  if (status === 'upcoming') {
    const diffMs = remindAt.getTime() - now.getTime()
    const diffMin = Math.round(diffMs / 60000)
    if (diffMin <= 1) message = `${activity.title} começa em instantes.`
    else if (diffMin < 60) message = `${activity.title} começa em ${diffMin} minutos.`
    else message = `${activity.title} está programado para ${remindAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`
  } else if (status === 'due') {
    message = `${activity.title} está programado para agora.`
  } else {
    message = `O lembrete de ${activity.title} já passou.`
  }

  return {
    id: activity.id,
    activityId: activity.id,
    title: activity.title,
    message,
    remindAt,
    scheduledAt: activity.scheduledAt,
    readAt: activity.reminder.readAt,
    dismissedAt: activity.reminder.dismissedAt,
    status,
  }
}

export interface NotificationsContextType {
  notifications: ReminderNotification[]
  dueNotifications: ReminderNotification[]
  upcomingNotifications: ReminderNotification[]
  unreadCount: number
  isLoading: boolean
  error: string | null
  markAsRead: (activityId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  dismiss: (activityId: string) => Promise<void>
  retry: () => void
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  dueNotifications: [],
  upcomingNotifications: [],
  unreadCount: 0,
  isLoading: true,
  error: null,
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  dismiss: async () => {},
  retry: () => {},
})

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { preferences } = useContext(PreferencesContext)
  const { interface: interfaceMode } = useAccessibility()
  const [activities, setActivities] = useState<Activity[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const unsubRef = useRef<(() => void) | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const announcedRef = useRef<Set<string>>(new Set())
  const [liveMessage, setLiveMessage] = useState('')

  const remindersEnabled = preferences.remindersEnabled

  const hasActiveUser = !!user && remindersEnabled
  const displayedActivities = hasActiveUser ? (activities ?? []) : []
  const isLoading = hasActiveUser && activities === null && error === null

  const nowRef = useRef(0)

  const buildNotifications = useCallback((acts: Activity[]): ReminderNotification[] => {
    const now = new Date()
    return acts.map((a) => buildNotification(a, now))
  }, [])

  useEffect(() => {
    if (!hasActiveUser) {
      announcedRef.current = new Set()
      return
    }

    announcedRef.current = new Set()

    const unsub = useCases.subscribeToActiveReminders(
      user.uid,
      (data) => {
        setActivities(data)
      },
      (err) => {
        setError(err.message)
      }
    )
    unsubRef.current = unsub

    const intervalMs = 15000
    intervalRef.current = setInterval(() => {
      const now = new Date()
      const previousNow = new Date(nowRef.current)
      nowRef.current = now.getTime()

      setActivities((prev) => {
        if (!prev) return prev
        const newDue: string[] = []

        prev.forEach((a) => {
          if (!a.reminder.remindAt) return
          if (announcedRef.current.has(a.id)) return
          const wasUpcoming = a.reminder.remindAt > previousNow
          const isNowDue = a.reminder.remindAt <= now && a.reminder.remindAt > previousNow
          if (wasUpcoming && isNowDue) {
            announcedRef.current.add(a.id)
            newDue.push(a.title)
          }
        })

        if (newDue.length > 0) {
          const msg = newDue.length === 1
            ? `Lembrete: ${newDue[0]} está programado para agora.`
            : `${newDue.length} lembretes estão programados para agora.`
          setLiveMessage(msg)
        }

        return [...prev]
      })
    }, intervalMs)

    return () => {
      setError(null)
      setActivities(null)
      unsub()
      unsubRef.current = null
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [hasActiveUser])

  useEffect(() => {
    if (liveMessage) {
      const timer = setTimeout(() => setLiveMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [liveMessage])

  const notifications = useMemo(() => buildNotifications(displayedActivities), [displayedActivities, buildNotifications])

  const dueNotifications = useMemo(
    () => notifications.filter((n) => n.status === 'due' || n.status === 'overdue'),
    [notifications]
  )

  const upcomingNotifications = useMemo(
    () => notifications.filter((n) => n.status === 'upcoming'),
    [notifications]
  )

  const unreadCount = useMemo(
    () => notifications.filter((n) => (n.status === 'due' || n.status === 'overdue') && !n.readAt && !n.dismissedAt).length,
    [notifications]
  )

  const markAsRead = useCallback(async (activityId: string) => {
    if (!user) return
    try {
      await useCases.markReminderAsRead(activityId, user.uid)
    } catch {
      setError('Não foi possível marcar como lida.')
    }
  }, [user])

  const markAllAsRead = useCallback(async () => {
    if (!user) return
    const unreadIds = dueNotifications
      .filter((n) => !n.readAt && !n.dismissedAt)
      .map((n) => n.activityId)
    if (unreadIds.length === 0) return
    try {
      await useCases.markAllRemindersAsRead(unreadIds, user.uid)
    } catch {
      setError('Não foi possível marcar todas como lidas.')
    }
  }, [user, dueNotifications])

  const dismiss = useCallback(async (activityId: string) => {
    if (!user) return
    try {
      await useCases.dismissReminder(activityId, user.uid)
    } catch {
      setError('Não foi possível dispensar o lembrete.')
      throw new Error('dismiss failed')
    }
  }, [user])

  const retry = useCallback(() => {
    if (!user) return
    setError(null)
    setActivities(null)

    if (unsubRef.current) {
      unsubRef.current()
    }

    const unsub = useCases.subscribeToActiveReminders(
      user.uid,
      (data) => {
        setActivities(data)
      },
      (err) => {
        setError(err.message)
      }
    )
    unsubRef.current = unsub
  }, [user])

  const value = useMemo(
    () => ({
      notifications,
      dueNotifications,
      upcomingNotifications,
      unreadCount,
      isLoading,
      error,
      markAsRead,
      markAllAsRead,
      dismiss,
      retry,
    }),
    [notifications, dueNotifications, upcomingNotifications, unreadCount, isLoading, error, markAsRead, markAllAsRead, dismiss, retry]
  )

  return (
    <NotificationsContext.Provider value={value}>
      {liveMessage && <LiveRegion message={liveMessage} />}
      {children}
    </NotificationsContext.Provider>
  )
}
