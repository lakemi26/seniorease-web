'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useActivityList } from '@/modules/activities/presentation/hooks/useActivityList'
import { ActivityFilters } from '@/modules/activities/presentation/components/ActivityFilters'
import { ActivityCard } from '@/modules/activities/presentation/components/ActivityCard'
import { ActivitiesEmptyState } from '@/modules/activities/presentation/components/ActivitiesEmptyState'
import { ActivitiesSkeleton } from '@/modules/activities/presentation/components/ActivitiesSkeleton'
import { ActivitiesErrorState } from '@/modules/activities/presentation/components/ActivitiesErrorState'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { sortActivities } from '@/modules/activities/presentation/utils/activity.utils'
import { Button } from '@/presentation/components/ui/Button'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { ActivityModalController } from '@/modules/activities/presentation/components/ActivityModalController'

function AtividadesListInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { interface: interfaceMode } = useAccessibility()
  const {
    activities,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    periodFilter,
    setPeriodFilter,
    searchQuery,
    setSearchQuery,
    mode,
    setMode,
    retry,
    isEmpty,
    isFilterEmpty,
  } = useActivityList()

  const effectiveMode = mode === 'basic' && interfaceMode === 'complete' ? 'complete' : mode

  if (effectiveMode !== mode) {
    setMode(effectiveMode)
  }

  if (loading) {
    return (
      <>
        <LiveRegion message="Carregando suas atividades." />
        <ActivitiesSkeleton />
      </>
    )
  }

  if (error) {
    return <ActivitiesErrorState onRetry={retry} />
  }

  const sorted = sortActivities(activities)

  return (
    <div className="flex flex-col gap-6">
      <LiveRegion message={activities.length > 0 ? `${activities.length} atividades carregadas` : ''} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <ActivityFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          periodFilter={periodFilter}
          onPeriodFilterChange={setPeriodFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mode={mode}
        />
        <Button variant="primary" size="normal" onClick={() => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('modal', 'nova')
          router.push(`/atividades?${params.toString()}`)
        }}>
          Nova atividade
        </Button>
      </div>

      {isEmpty && <ActivitiesEmptyState variant="empty" />}
      {isFilterEmpty && <ActivitiesEmptyState variant="filter-empty" />}

      {!isEmpty && !isFilterEmpty && (
        <div className="flex flex-col gap-3" role="list" aria-label="Lista de atividades">
          {sorted.map((activity) => (
            <div key={activity.id} role="listitem">
              <button
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set('modal', 'detalhes')
                  params.set('id', activity.id)
                  router.push(`/atividades?${params.toString()}`)
                }}
                className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-md"
              >
                <ActivityCard activity={activity} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ActivityModalController />
    </div>
  )
}

export function AtividadesListWrapper() {
  return <AtividadesListInner />
}
