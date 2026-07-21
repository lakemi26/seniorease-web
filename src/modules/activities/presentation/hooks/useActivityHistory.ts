'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import type { Activity } from '../../domain/entities'
import type { ActivityHistoryFilters } from '../../domain/repositories'

const repository = createFirebaseActivityRepository()
const useCases = createActivityUseCases(repository)

const DEFAULT_FILTERS: ActivityHistoryFilters = {
  period: 'all',
  category: 'all',
}

export function useActivityHistory() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ActivityHistoryFilters>(DEFAULT_FILTERS)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const unsubRef = useRef<(() => void) | null>(null)

  const subscribe = useCallback((newFilters: ActivityHistoryFilters) => {
    if (!user) return

    setLoading(true)
    setError(null)

    setFilters(newFilters)

    const unsub = useCases.subscribeToActivityHistory(
      user.uid,
      newFilters,
      (data) => {
        setActivities(data)
        setHasMore(data.length >= 20)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    unsubRef.current = unsub

    return unsub
  }, [user])

  useEffect(() => {
    if (!user) return
    const unsub = subscribe(DEFAULT_FILTERS)
    return () => {
      unsub?.()
      unsubRef.current = null
    }
  }, [user, subscribe])

  const applyFilters = useCallback((newFilters: ActivityHistoryFilters) => {
    unsubRef.current?.()
    subscribe(newFilters)
  }, [subscribe])

  const clearFilters = useCallback(() => {
    unsubRef.current?.()
    subscribe(DEFAULT_FILTERS)
  }, [subscribe])

  const loadMore = useCallback(async () => {
    if (!user || !hasMore || loadingMore) return
    setLoadingMore(true)
    // The onSnapshot already gives us the first 20. For "load more" we'd need
    // a paginated query with startAfter. For now, the real-time subscription
    // covers the initial 20. A future enhancement can implement cursor-based pagination.
    setHasMore(false)
    setLoadingMore(false)
  }, [user, hasMore, loadingMore])

  return {
    activities,
    loading,
    error,
    filters,
    hasMore,
    loadingMore,
    applyFilters,
    clearFilters,
    loadMore,
  }
}
