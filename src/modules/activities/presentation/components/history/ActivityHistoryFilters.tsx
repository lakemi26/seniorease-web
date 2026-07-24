'use client'

import { useState, useCallback, useRef, useEffect, useId } from 'react'
import { Button } from '@/presentation/components/ui/Button'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import type { ActivityHistoryFilters as Filters } from '../../../domain/repositories'
import type { ActivityCategory } from '../../../domain/entities'
import { CATEGORY_OPTIONS } from '../../utils/activity.utils'

interface ActivityHistoryFiltersProps {
  filters: Filters
  onApply: (filters: Filters) => void
  onClear: () => void
}

export function ActivityHistoryFilters({ filters, onApply, onClear }: ActivityHistoryFiltersProps) {
  const { interface: interfaceMode } = useAccessibility()
  const isComplete = interfaceMode === 'complete'
  const searchId = useId()

  const [period, setPeriod] = useState<Filters['period']>(filters.period)
  const [category, setCategory] = useState<ActivityCategory | 'all'>(filters.category)
  const [search, setSearch] = useState(filters.search || '')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dateError, setDateError] = useState<string | null>(null)

  const periodRef = useRef(period)
  periodRef.current = period
  const categoryRef = useRef(category)
  categoryRef.current = category

  useEffect(() => {
    const currentSearch = search || ''
    const filterSearch = filters.search || ''
    if (currentSearch === filterSearch) return
    const timer = setTimeout(() => {
      onApply({ period: periodRef.current, category: categoryRef.current, search: currentSearch || undefined })
    }, 350)
    return () => clearTimeout(timer)
  }, [search, filters.search, onApply])

  const handlePeriodChange = useCallback((p: Filters['period']) => {
    setPeriod(p)
    setDateError(null)
    if (p !== 'custom') {
      onApply({ period: p, category, search: search || undefined })
    }
  }, [category, search, onApply])

  const handleApplyCustom = useCallback(() => {
    if (!startDate || !endDate) {
      setDateError('Defina a data inicial e final do período.')
      return
    }
    const start = new Date(startDate + 'T00:00:00')
    const end = new Date(endDate + 'T23:59:59')
    if (end < start) {
      setDateError('A data final deve ser igual ou posterior à data inicial.')
      return
    }
    setDateError(null)
    onApply({ period: 'custom', category, search: search || undefined, startDate: start, endDate: end })
  }, [startDate, endDate, category, search, onApply])

  const handleCategoryChange = useCallback((cat: ActivityCategory | 'all') => {
    setCategory(cat)
    onApply({ period, category: cat, search: search || undefined })
  }, [period, search, onApply])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(['all', 'week', 'month'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePeriodChange(p)}
            aria-pressed={period === p}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
              period === p
                ? 'bg-primary text-white border-primary'
                : 'bg-surface text-text-muted border-border hover:border-primary'
            }`}
          >
            {p === 'all' ? 'Todas' : p === 'week' ? 'Esta semana' : 'Este mês'}
          </button>
        ))}
        {isComplete && (
          <button
            type="button"
            onClick={() => handlePeriodChange('custom')}
            aria-pressed={period === 'custom'}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
              period === 'custom'
                ? 'bg-primary text-white border-primary'
                : 'bg-surface text-text-muted border-border hover:border-primary'
            }`}
          >
            Período personalizado
          </button>
        )}
      </div>

      {isComplete && (
        <div className="flex flex-wrap gap-2">
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as ActivityCategory | 'all')}
            aria-label="Filtrar por categoria"
            className="px-3 py-1.5 text-xs rounded-md border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <option value="all">Todas as categorias</option>
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <div className="flex-1 min-w-[200px]">
            <label className="sr-only" htmlFor={searchId}>Buscar no histórico</label>
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite o nome da atividade"
              className="w-full px-3 py-1.5 text-xs rounded-md border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus placeholder:text-text-muted"
              aria-label="Buscar no histórico"
            />
          </div>
        </div>
      )}

      {period === 'custom' && (
        <div className="flex flex-wrap items-end gap-3 p-3 rounded-md bg-primary-lighter border border-primary/20">
          <div>
            <label htmlFor="history-start" className="block text-xs text-text-muted mb-1">Data inicial</label>
            <input
              id="history-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-md border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            />
          </div>
          <div>
            <label htmlFor="history-end" className="block text-xs text-text-muted mb-1">Data final</label>
            <input
              id="history-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-md border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            />
          </div>
          <Button variant="primary" size="normal" onClick={handleApplyCustom}>
            Aplicar período
          </Button>
          {dateError && <p className="text-xs text-danger w-full">{dateError}</p>}
        </div>
      )}
    </div>
  )
}
