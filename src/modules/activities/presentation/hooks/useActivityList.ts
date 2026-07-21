'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import type { Activity } from '../../domain/entities'
import type { ActivityFilters } from '../../domain/repositories'

const repository = createFirebaseActivityRepository()
const activityUseCases = createActivityUseCases(repository)

export type PeriodFilter = 'all' | 'today' | 'upcoming' | 'completed'

export function useActivityList() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)
  const [statusFilter, setStatusFilter] = useState<Activity['status'] | 'all'>('all')
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Activity['category'] | 'all'>('all')
  const [mode, setMode] = useState<'basic' | 'complete'>('basic')

  const unsubscriberRef = useRef<(() => void) | null>(null)

  const retry = useCallback(() => {
    setError(null)
    setLoading(true)
  }, [])

  useEffect(() => {
    if (!user) return

    unsubscriberRef.current?.()

    const filters: ActivityFilters = {
      status: statusFilter,
      period: periodFilter,
      search: searchQuery || undefined,
      category: categoryFilter,
    }

    const unsub = activityUseCases.subscribeByUser(
      user.uid,
      filters,
      (data) => {
        setActivities(data)
        if (mountedRef.current) setLoading(false)
        setError(null)
      },
      (err) => {
        setError(err.message)
        if (mountedRef.current) setLoading(false)
      }
    )

    unsubscriberRef.current = unsub

    return () => {
      unsub()
      unsubscriberRef.current = null
    }
  }, [user, statusFilter, periodFilter, searchQuery, categoryFilter])

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  const clearFilters = useCallback(() => {
    setStatusFilter('all')
    setPeriodFilter('all')
    setSearchQuery('')
    setCategoryFilter('all')
  }, [])

  const hasActiveFilters =
    statusFilter !== 'all' || periodFilter !== 'all' || searchQuery !== '' || categoryFilter !== 'all'

  const isEmpty = !loading && !error && activities.length === 0 && !hasActiveFilters
  const isFilterEmpty = !loading && !error && activities.length === 0 && hasActiveFilters

  return {
    activities,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    periodFilter,
    setPeriodFilter,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    mode,
    setMode,
    retry,
    clearFilters,
    hasActiveFilters,
    isEmpty,
    isFilterEmpty,
  }
}
