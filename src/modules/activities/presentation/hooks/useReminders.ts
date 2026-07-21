'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import type { Activity } from '../../domain/entities'

const repository = createFirebaseActivityRepository()
const useCases = createActivityUseCases(repository)

export function useReminders() {
  const { user } = useAuth()
  const [reminders, setReminders] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dismissingId, setDismissingId] = useState<string | null>(null)
  const [dismissError, setDismissError] = useState<string | null>(null)
  const unsubRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!user) return

    setLoading(true)
    setError(null)

    const referenceDate = new Date()
    const next24h = new Date(referenceDate.getTime() + 24 * 60 * 60 * 1000)

    const unsub = useCases.subscribeToDueReminders(
      user.uid,
      next24h,
      (activities) => {
        setReminders(activities)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
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
