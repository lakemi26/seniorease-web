'use client'

import { useRouter } from 'next/navigation'
import { useActivityHistory } from '@/modules/activities/presentation/hooks/useActivityHistory'
import { ActivityHistoryFilters } from '@/modules/activities/presentation/components/history/ActivityHistoryFilters'
import { ActivityHistoryList } from '@/modules/activities/presentation/components/history/ActivityHistoryList'
import { ActivityHistoryEmptyState } from '@/modules/activities/presentation/components/history/ActivityHistoryEmptyState'
import { ActivityHistorySkeleton } from '@/modules/activities/presentation/components/history/ActivityHistorySkeleton'
import { ErrorState } from '@/modules/dashboard/presentation/components/ErrorState'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'

export function HistoryPage() {
  const router = useRouter()
  const { interface: interfaceMode } = useAccessibility()
  const isBasic = interfaceMode === 'basic'

  const {
    activities,
    loading,
    error,
    filters,
    hasMore,
    loadingMore,
    applyFilters,
    clearFilters,
    loadMore,
  } = useActivityHistory()

  const handleViewDetails = (id: string) => {
    router.push(`/atividades?modal=detalhes&id=${id}&from=history`)
  }

  if (loading) {
    return (
      <>
        <LiveRegion message="Carregando seu histórico." />
        <ActivityHistorySkeleton />
      </>
    )
  }

  if (error) {
    return (
      <ErrorState
        message="Não foi possível carregar o histórico. Verifique sua conexão e tente novamente."
        onRetry={() => window.location.reload()}
      />
    )
  }

  const isFiltered = filters.period !== 'all' || filters.category !== 'all' || !!filters.search
  const isEmpty = activities.length === 0 && !isFiltered
  const isFilterEmpty = activities.length === 0 && isFiltered

  return (
    <>
      <LiveRegion
        message={activities.length > 0 ? `${activities.length} atividades carregadas` : ''}
      />

      <div className="flex flex-col gap-6">
        <ActivityHistoryFilters
          filters={filters}
          onApply={applyFilters}
          onClear={clearFilters}
        />

        {isEmpty && <ActivityHistoryEmptyState variant="empty" />}
        {isFilterEmpty && (
          <ActivityHistoryEmptyState variant="filter-empty" onClearFilters={clearFilters} />
        )}

        {!isEmpty && !isFilterEmpty && (
          <ActivityHistoryList
            activities={activities}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={loadMore}
            onView={handleViewDetails}
          />
        )}
      </div>
    </>
  )
}
