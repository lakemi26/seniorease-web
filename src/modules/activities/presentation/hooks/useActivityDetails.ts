'use client'

import { useEffect, useReducer } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { getFirebaseFirestore } from '@/infrastructure/firebase/firebase.firestore'
import type { ActivityDocument } from '../../infrastructure/mappers/types'
import { mapActivityDocument } from '../../infrastructure/mappers/activity.mapper'
import type { Activity } from '../../domain/entities'

interface State {
  activity: Activity | null
  loading: boolean
  error: string | null
  notFound: boolean
}

type Action =
  | { type: 'loading' }
  | { type: 'success'; activity: Activity }
  | { type: 'notFound' }
  | { type: 'error'; message: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loading':
      return { activity: null, loading: true, error: null, notFound: false }
    case 'success':
      return { activity: action.activity, loading: false, error: null, notFound: false }
    case 'notFound':
      return { activity: null, loading: false, error: null, notFound: true }
    case 'error':
      return { activity: null, loading: false, error: action.message, notFound: false }
    default:
      return state
  }
}

export function useActivityDetails(activityId: string | null) {
  const [state, dispatch] = useReducer(reducer, {
    activity: null,
    loading: true,
    error: null,
    notFound: false,
  })

  useEffect(() => {
    if (!activityId) return

    dispatch({ type: 'loading' })

    const db = getFirebaseFirestore()
    const docRef = doc(db, 'activities', activityId)

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          dispatch({ type: 'notFound' })
          return
        }

        const raw = { id: snapshot.id, ...snapshot.data() } as ActivityDocument
        dispatch({ type: 'success', activity: mapActivityDocument(raw) })
      },
      (err) => {
        dispatch({ type: 'error', message: err.message })
      }
    )

    return () => {
      unsub()
    }
  }, [activityId])

  return state
}
