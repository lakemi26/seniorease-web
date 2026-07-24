'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import type { Activity, WeeklySummary } from '@/modules/activities/domain/entities'

const activityRepository = createFirebaseActivityRepository()
const activityUseCases = createActivityUseCases(activityRepository)
const authRepository = createFirebaseAuthRepository()
const authUseCases = createAuthUseCases(authRepository)

function getDayBoundaries(): { startOfDay: Date; endOfDay: Date } {
  const now = new Date()
  const startOfDay = new Date(now)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)

  return { startOfDay, endOfDay }
}

export function useDashboard() {
  const { user } = useAuth()
  const [nextActivity, setNextActivity] = useState<Activity | null>(null)
  const [todayActivities, setTodayActivities] = useState<Activity[]>([])
  const [inProgressActivities, setInProgressActivities] = useState<Activity[]>([])
  const [recentCompleted, setRecentCompleted] = useState<Activity[]>([])
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null)
  const [dueReminders, setDueReminders] = useState<Activity[]>([])
  const [remindersLoading, setRemindersLoading] = useState(true)
  const [remindersError, setRemindersError] = useState<string | null>(null)
  const [dismissingId, setDismissingId] = useState<string | null>(null)
  const [remindersEnabled, setRemindersEnabled] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  const loading = user !== null && !isInitialized

  const initializedRef = useRef(false)
  const unsubscribersRef = useRef<(() => void)[]>([])

  const [prevRemindersEnabled, setPrevRemindersEnabled] = useState(remindersEnabled)

  if (prevRemindersEnabled !== remindersEnabled) {
    setPrevRemindersEnabled(remindersEnabled)
    if (remindersEnabled === false) {
      setRemindersLoading(false)
      setDueReminders([])
      setRemindersError(null)
    } else if (remindersEnabled === true) {
      setRemindersLoading(true)
      setDueReminders([])
      setRemindersError(null)
    }
  }

  const retry = useCallback(() => {
    setError(null)
    setIsInitialized(false)
    setRetryCount((c) => c + 1)
  }, [])

  const dismissReminder = useCallback(async (activityId: string) => {
    if (!user) return
    setDismissingId(activityId)
    try {
      await activityUseCases.dismissReminder(activityId, user.uid)
    } catch {
      setRemindersError('Não foi possível dispensar o lembrete. Tente novamente.')
    } finally {
      setDismissingId(null)
    }
  }, [user])

  useEffect(() => {
    unsubscribersRef.current.forEach((fn) => fn())
    unsubscribersRef.current = []
    initializedRef.current = false

    if (!user) return

    const uid = user.uid
    const { startOfDay, endOfDay } = getDayBoundaries()

    authUseCases.getUserPreferences(uid).then((prefs) => {
      if (prefs) setRemindersEnabled(prefs.remindersEnabled)
    }).catch(() => {})

    const onError = (err: Error) => setError(err.message)

    const done = () => {
      if (!initializedRef.current) {
        initializedRef.current = true
        setIsInitialized(true)
      }
    }

    const unsubNext = activityUseCases.subscribeToNextActivity(uid, (a) => { setNextActivity(a); done() }, onError)
    unsubscribersRef.current.push(unsubNext)

    const unsubToday = activityUseCases.subscribeToTodayActivities(uid, startOfDay, endOfDay, (a) => { setTodayActivities(a); done() }, onError)
    unsubscribersRef.current.push(unsubToday)

    const unsubInProgress = activityUseCases.subscribeToInProgressActivities(uid, (a) => { setInProgressActivities(a); done() }, onError)
    unsubscribersRef.current.push(unsubInProgress)

    const unsubRecent = activityUseCases.subscribeToRecentCompletedActivities(uid, (a) => { setRecentCompleted(a); done() }, onError)
    unsubscribersRef.current.push(unsubRecent)

    activityUseCases.getWeeklySummary(uid).then((s) => { setWeeklySummary(s); done() }).catch((err) => { onError(err); done() })

    return () => {
      unsubscribersRef.current.forEach((fn) => fn())
      unsubscribersRef.current = []
      initializedRef.current = false
    }
  }, [user, retryCount])

  useEffect(() => {
    if (!user || !remindersEnabled) return
    const next24h = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const unsubReminders = activityUseCases.subscribeToDueReminders(
      user.uid,
      next24h,
      (data) => { setDueReminders(data); setRemindersLoading(false) },
      (err) => { setRemindersError(err.message); setRemindersLoading(false) }
    )
    return () => { unsubReminders() }
  }, [user, remindersEnabled])

  return {
    nextActivity,
    todayActivities,
    inProgressActivities,
    recentCompleted,
    weeklySummary,
    dueReminders,
    remindersLoading,
    remindersError,
    dismissingId,
    remindersEnabled,
    dismissReminder,
    loading,
    error,
    retry,
  }
}
