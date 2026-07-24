'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import type { Activity, WeeklySummary } from '@/modules/activities/domain/entities'

const activityRepository = createFirebaseActivityRepository()
const activityUseCases = createActivityUseCases(activityRepository)

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
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  const loading = user !== null && !isInitialized

  const initializedRef = useRef(false)
  const unsubscribersRef = useRef<(() => void)[]>([])

  const retry = useCallback(() => {
    setError(null)
    setIsInitialized(false)
    setRetryCount((c) => c + 1)
  }, [])

  useEffect(() => {
    unsubscribersRef.current.forEach((fn) => fn())
    unsubscribersRef.current = []
    initializedRef.current = false

    if (!user) return

    const uid = user.uid
    const { startOfDay, endOfDay } = getDayBoundaries()

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

  return {
    nextActivity,
    todayActivities,
    inProgressActivities,
    recentCompleted,
    weeklySummary,
    loading,
    error,
    retry,
  }
}
