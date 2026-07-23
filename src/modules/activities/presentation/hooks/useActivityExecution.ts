'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import type { Activity } from '../../domain/entities'
import { doc, onSnapshot } from 'firebase/firestore'
import { getFirebaseFirestore } from '@/infrastructure/firebase/firebase.firestore'
import type { ActivityDocument } from '../../infrastructure/mappers/types'
import { mapActivityDocument } from '../../infrastructure/mappers/activity.mapper'

const repository = createFirebaseActivityRepository()
const useCases = createActivityUseCases(repository)

export function useActivityExecution(activityId: string | null) {
  const { user } = useAuth()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const unsubRef = useRef<(() => void) | null>(null)

  const sortedSteps = activity
    ? [...activity.steps].sort((a, b) => a.order - b.order)
    : []

  const nextPendingIndex = sortedSteps.findIndex((s) => !s.completed)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useEffect(() => {
    if (nextPendingIndex >= 0 && nextPendingIndex !== currentStepIndex) {
      setCurrentStepIndex(nextPendingIndex)
    }
  }, [nextPendingIndex])

  useEffect(() => {
    setCurrentStepIndex(0)
  }, [activityId])

  useEffect(() => {
    if (!activityId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const db = getFirebaseFirestore()
    const docRef = doc(db, 'activities', activityId)

    unsubRef.current = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setActivity(null)
          setLoading(false)
          setError('Atividade não encontrada.')
          return
        }

        const raw = { id: snapshot.id, ...snapshot.data() } as ActivityDocument
        const mapped = mapActivityDocument(raw)
        setActivity(mapped)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    return () => {
      unsubRef.current?.()
      unsubRef.current = null
    }
  }, [activityId])

  const startActivity = useCallback(async () => {
    if (!user || !activityId) return
    setSaving(true)
    setError(null)
    try {
      await useCases.startActivity(activityId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao iniciar atividade.')
    } finally {
      setSaving(false)
    }
  }, [user, activityId])

  const completeCurrentStep = useCallback(async (): Promise<boolean> => {
    if (!user || !activityId) return false
    const step = sortedSteps[currentStepIndex]
    if (!step || step.completed) return false
    setSaving(true)
    setError(null)
    try {
      await useCases.completeActivityStep(activityId, step.id, user.uid)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao concluir etapa.')
      return false
    } finally {
      setSaving(false)
    }
  }, [user, activityId, currentStepIndex, sortedSteps])

  const reopenStep = useCallback(async (stepId: string) => {
    if (!user || !activityId) return
    setSaving(true)
    setError(null)
    try {
      await useCases.reopenActivityStep(activityId, stepId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao reabrir etapa.')
    } finally {
      setSaving(false)
    }
  }, [user, activityId])

  const completeActivity = useCallback(async (): Promise<boolean> => {
    if (!user || !activityId) return false
    setSaving(true)
    setError(null)
    try {
      await useCases.completeActivity(activityId, user.uid)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao concluir atividade.')
      return false
    } finally {
      setSaving(false)
    }
  }, [user, activityId])

  const reopenActivity = useCallback(async () => {
    if (!user || !activityId) return
    setSaving(true)
    setError(null)
    try {
      await useCases.reopenActivity(activityId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao reabrir atividade.')
    } finally {
      setSaving(false)
    }
  }, [user, activityId])

  const clearError = useCallback(() => setError(null), [])

  const completedStepsCount = sortedSteps.filter((s) => s.completed).length
  const allStepsCompleted = sortedSteps.length > 0 && sortedSteps.every((s) => s.completed)
  const displayIndex = nextPendingIndex !== -1 ? nextPendingIndex : sortedSteps.length

  return {
    activity,
    currentStepIndex,
    displayIndex,
    sortedSteps,
    totalSteps: sortedSteps.length,
    completedStepsCount,
    allStepsCompleted,
    loading,
    saving,
    error,
    clearError,
    startActivity,
    completeCurrentStep,
    reopenStep,
    completeActivity,
    reopenActivity,
    setCurrentStepIndex,
  }
}
