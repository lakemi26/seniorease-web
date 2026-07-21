'use client'

import { Button } from '@/presentation/components/ui/Button'
import { History } from 'lucide-react'

interface ActivityHistoryEmptyStateProps {
  variant: 'empty' | 'filter-empty'
  onClearFilters?: () => void
}

export function ActivityHistoryEmptyState({ variant, onClearFilters }: ActivityHistoryEmptyStateProps) {
  if (variant === 'filter-empty') {
    return (
      <div className="flex flex-col items-center text-center py-12 px-4">
        <History className="w-12 h-12 text-text-muted mb-4" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-text mb-2">Nenhuma atividade encontrada.</h2>
        <p className="text-sm text-text-muted mb-4">Altere os filtros ou escolha outro período.</p>
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>Limpar filtros</Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center py-12 px-4">
      <History className="w-12 h-12 text-text-muted mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-text mb-2">Você ainda não concluiu atividades.</h2>
      <p className="text-sm text-text-muted">Quando uma atividade for concluída, ela aparecerá aqui.</p>
    </div>
  )
}
