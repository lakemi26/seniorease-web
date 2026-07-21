'use client'

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
import { CreateActivityModal } from '@/modules/activities/presentation/components/CreateActivityModal'
import { useState } from 'react'

function AtividadesListInner() {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
        <Button variant="primary" size="normal" onClick={() => setIsModalOpen(true)}>
          Nova atividade
        </Button>
      </div>

      {isEmpty && <ActivitiesEmptyState variant="empty" />}
      {isFilterEmpty && <ActivitiesEmptyState variant="filter-empty" />}

      {!isEmpty && !isFilterEmpty && (
        <div className="flex flex-col gap-3" role="list" aria-label="Lista de atividades">
          {sorted.map((activity) => (
            <div key={activity.id} role="listitem">
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      )}

      <CreateActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export function AtividadesListWrapper() {
  return <AtividadesListInner />
}
