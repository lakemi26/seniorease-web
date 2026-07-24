'use client'

import { useState, useEffect, useCallback, useRef, useReducer } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import type { Activity } from '../../domain/entities'

const repository = createFirebaseActivityRepository()
const useCases = createActivityUseCases(repository)

type LoadState = { loading: boolean; error: string | null; userKey: string | null }

type LoadAction =
  | { type: 'CHECK'; userKey: string | null }
  | { type: 'DONE' }
  | { type: 'ERROR'; error: string }

function loadReducer(state: LoadState, action: LoadAction): LoadState {
  switch (action.type) {
    case 'CHECK':
      if (state.userKey !== action.userKey) {
        return { loading: action.userKey !== null, error: null, userKey: action.userKey }
      }
      return state
    case 'DONE':
      return { ...state, loading: false }
    case 'ERROR':
      return { ...state, loading: false, error: action.error }
  }
}

export function useReminders() {
  const { user } = useAuth()
  const [reminders, setReminders] = useState<Activity[]>([])
  const [loadState, dispatchLoad] = useReducer(loadReducer, {
    loading: true,
    error: null,
    userKey: null,
  })
  const [dismissingId, setDismissingId] = useState<string | null>(null)
  const [dismissError, setDismissError] = useState<string | null>(null)
  const unsubRef = useRef<(() => void) | null>(null)

  dispatchLoad({ type: 'CHECK', userKey: user?.uid ?? null })

  const loading = loadState.loading
  const error = loadState.error

  useEffect(() => {
    if (!user) return

    const referenceDate = new Date()
    const next24h = new Date(referenceDate.getTime() + 24 * 60 * 60 * 1000)

    const unsub = useCases.subscribeToDueReminders(
      user.uid,
      next24h,
      (activities) => {
        setReminders(activities)
        dispatchLoad({ type: 'DONE' })
      },
      (err) => {
        dispatchLoad({ type: 'ERROR', error: err.message })
      }
    )

    unsubRef.current = unsub

    return () => {
      unsub()
      unsubRef.current = null
    }
  }, [user])

  const dismiss = useCallback(async (activityId: string) => {
    if (!user) return
    setDismissingId(activityId)
    setDismissError(null)
    try {
      await useCases.dismissReminder(activityId, user.uid)
    } catch (err) {
      setDismissError(err instanceof Error ? err.message : 'Não foi possível dispensar o lembrete. Tente novamente.')
    } finally {
      setDismissingId(null)
    }
  }, [user])

  const clearDismissError = useCallback(() => setDismissError(null), [])

  return {
    reminders,
    loading,
    error,
    dismissingId,
    dismissError,
    dismiss,
    clearDismissError,
  }
}
