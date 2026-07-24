'use client'

import { useState, useEffect, useCallback, useRef, useReducer } from 'react'
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

const PAGE_SIZE = 20

type FiltersAction =
  | { type: 'APPLY'; filters: ActivityHistoryFilters }
  | { type: 'RESET' }

function filtersReducer(state: ActivityHistoryFilters, action: FiltersAction): ActivityHistoryFilters {
  switch (action.type) {
    case 'APPLY':
      return action.filters
    case 'RESET':
      return DEFAULT_FILTERS
  }
}

export function useActivityHistory() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, dispatchFilters] = useReducer(filtersReducer, DEFAULT_FILTERS)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const cursorRef = useRef<unknown | null>(null)
  const loadingRef = useRef(false)

  const [prevUserKey, setPrevUserKey] = useState<string | null>(null)

  if (prevUserKey !== (user?.uid ?? null)) {
    setPrevUserKey(user?.uid ?? null)
    setLoading(user?.uid !== undefined && user?.uid !== null)
    setError(null)
  }

  const fetchPage = useCallback(async (newFilters: ActivityHistoryFilters, cursor: unknown, reset: boolean) => {
    if (!user) return
    loadingRef.current = true
    try {
      const result = await useCases.fetchCompletedActivitiesPage(user.uid, newFilters, cursor, PAGE_SIZE)
      if (reset) {
        setActivities(result.data)
      } else {
        setActivities((prev) => [...prev, ...result.data])
      }
      cursorRef.current = result.nextCursor
      setHasMore(!!result.nextCursor)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err instanceof Error ? err.message : 'Erro ao carregar histórico.')
    } finally {
      loadingRef.current = false
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    cursorRef.current = null
    loadingRef.current = true

    useCases.fetchCompletedActivitiesPage(user.uid, DEFAULT_FILTERS, null, PAGE_SIZE)
      .then((result) => {
        setActivities(result.data)
        cursorRef.current = result.nextCursor
        setHasMore(!!result.nextCursor)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err instanceof Error ? err.message : 'Erro ao carregar histórico.')
      })
      .finally(() => {
        loadingRef.current = false
      })
  }, [user])

  const applyFilters = useCallback((newFilters: ActivityHistoryFilters) => {
    cursorRef.current = null
    dispatchFilters({ type: 'APPLY', filters: newFilters })
    setLoading(true)
    fetchPage(newFilters, null, true)
  }, [fetchPage])

  const clearFilters = useCallback(() => {
    cursorRef.current = null
    dispatchFilters({ type: 'RESET' })
    setLoading(true)
    fetchPage(DEFAULT_FILTERS, null, true)
  }, [fetchPage])

  const loadMore = useCallback(async () => {
    if (!user || !hasMore || loadingMore || loadingRef.current) return
    setLoadingMore(true)
    try {
      const result = await useCases.fetchCompletedActivitiesPage(user.uid, filters, cursorRef.current, PAGE_SIZE)
      setActivities((prev) => [...prev, ...result.data])
      cursorRef.current = result.nextCursor
      setHasMore(!!result.nextCursor)
    } catch {
      // Silently fail — user can retry by clicking again
    } finally {
      setLoadingMore(false)
    }
  }, [user, hasMore, loadingMore, filters])

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
