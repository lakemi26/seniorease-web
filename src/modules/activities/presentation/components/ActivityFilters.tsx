'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'
import type { Activity } from '../../domain/entities'
import type { PeriodFilter } from '../hooks/useActivityList'

interface ActivityFiltersProps {
  statusFilter: Activity['status'] | 'all'
  onStatusFilterChange: (filter: Activity['status'] | 'all') => void
  periodFilter: PeriodFilter
  onPeriodFilterChange: (filter: PeriodFilter) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  mode: 'basic' | 'complete'
}

const basicTabs: { value: PeriodFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'today', label: 'Hoje' },
  { value: 'upcoming', label: 'Próximas' },
]

const allTabs: { value: string; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'today', label: 'Hoje' },
  { value: 'upcoming', label: 'Próximas' },
  { value: 'inProgress', label: 'Em andamento' },
  { value: 'completed', label: 'Concluídas' },
]

export function ActivityFilters({
  statusFilter,
  onStatusFilterChange,
  periodFilter,
  onPeriodFilterChange,
  searchQuery,
  onSearchChange,
  mode,
}: ActivityFiltersProps) {
  const searchId = useId()
  const tabs = mode === 'basic' ? basicTabs : allTabs

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Filtros de atividade">
        {tabs.map((tab) => {
          const isActive = mode === 'basic'
            ? periodFilter === tab.value
            : (tab.value === 'all'
                ? statusFilter === 'all' && periodFilter === 'all'
                : tab.value === 'inProgress'
                  ? statusFilter === 'inProgress'
                  : tab.value === 'completed'
                    ? statusFilter === 'completed'
                    : periodFilter === tab.value)

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                if (tab.value === 'inProgress') {
                  onStatusFilterChange('inProgress')
                  onPeriodFilterChange('all')
                } else if (tab.value === 'completed') {
                  onStatusFilterChange('completed')
                  onPeriodFilterChange('all')
                } else {
                  onStatusFilterChange('all')
                  onPeriodFilterChange(tab.value as PeriodFilter)
                }
              }}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-normal whitespace-nowrap',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-primary-light'
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {mode === 'complete' && (
        <div>
          <label htmlFor={searchId} className="sr-only">
            Buscar atividade
          </label>
          <input
            id={searchId}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Digite o nome da atividade"
            aria-label="Buscar atividade"
            className="w-full px-4 py-2 rounded-md border bg-surface text-text text-sm border-border hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus placeholder:text-text-muted"
          />
        </div>
      )}
    </div>
  )
}
