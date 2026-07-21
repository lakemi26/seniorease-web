'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import {
  startOfMonth,
  startOfNextMonth,
  formatDateLong,
} from '../utils/date.utils'
import type { Activity } from '../../domain/entities'

const repository = createFirebaseActivityRepository()
const useCases = createActivityUseCases(repository)

export type CalendarView = 'agenda' | 'month'

export function useCalendarActivities() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState<CalendarView>('agenda')
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [changingMonth, setChangingMonth] = useState(false)
  const unsubRef = useRef<(() => void) | null>(null)

  const monthLabel = formatDateLong(currentMonth)

  const subscribe = useCallback((month: Date) => {
    if (!user) return

    setLoading(true)
    setError(null)

    const start = startOfMonth(month)
    const end = startOfNextMonth(month)

    const unsub = useCases.subscribeToCalendarActivities(
      user.uid,
      start,
      end,
      (data) => {
        setActivities(data)
        setLoading(false)
        setChangingMonth(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
        setChangingMonth(false)
      }
    )

    unsubRef.current = unsub

    return unsub
  }, [user])

  useEffect(() => {
    if (!user) return
    const unsub = subscribe(currentMonth)
    return () => {
      unsub?.()
      unsubRef.current = null
    }
  }, [user, currentMonth, subscribe])

  const goToPreviousMonth = useCallback(() => {
    setChangingMonth(true)
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const goToNextMonth = useCallback(() => {
    setChangingMonth(true)
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }, [])

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date)
  }, [])

  const changeView = useCallback((newView: CalendarView) => {
    setView(newView)
  }, [])

  return {
    activities,
    loading,
    error,
    currentMonth,
    monthLabel,
    view,
    selectedDate,
    changingMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    changeView,
    setView,
  }
}
