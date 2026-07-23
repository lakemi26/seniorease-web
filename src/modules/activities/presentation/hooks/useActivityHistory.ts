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

const PAGE_SIZE = 20

export function useActivityHistory() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ActivityHistoryFilters>(DEFAULT_FILTERS)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const cursorRef = useRef<unknown | null>(null)
  const loadingRef = useRef(false)

  const loadPage = useCallback(async (newFilters: ActivityHistoryFilters) => {
    if (!user) return

    loadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const result = await useCases.fetchCompletedActivitiesPage(user.uid, newFilters, null, PAGE_SIZE)
      setActivities(result.data)
      cursorRef.current = result.nextCursor
      setHasMore(!!result.nextCursor)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar histórico.')
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [user])

  useEffect(() => {
    cursorRef.current = null
    setFilters(DEFAULT_FILTERS)
    loadPage(DEFAULT_FILTERS)
  }, [user, loadPage])

  const applyFilters = useCallback((newFilters: ActivityHistoryFilters) => {
    cursorRef.current = null
    setFilters(newFilters)
    loadPage(newFilters)
  }, [loadPage])

  const clearFilters = useCallback(() => {
    cursorRef.current = null
    setFilters(DEFAULT_FILTERS)
    loadPage(DEFAULT_FILTERS)
  }, [loadPage])

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