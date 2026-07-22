'use client'

import { Button } from '@/presentation/components/ui/Button'
import { HelpCircle, History } from 'lucide-react'
import Link from 'next/link'

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
        <Link href="/ajuda?artigo=consultar-historico&origem=historico">
          <Button variant="ghost" size="normal" icon={<HelpCircle className="w-4 h-4" aria-hidden="true" />}>
            Como usar o histórico
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center py-12 px-4">
      <History className="w-12 h-12 text-text-muted mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-text mb-2">Você ainda não concluiu atividades.</h2>
      <p className="text-sm text-text-muted mb-4">Quando uma atividade for concluída, ela aparecerá aqui.</p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>Limpar filtros</Button>
        )}
        <Link href="/ajuda?artigo=consultar-historico&origem=historico">
          <Button variant="ghost" size="normal" icon={<HelpCircle className="w-4 h-4" aria-hidden="true" />}>
            Como usar o histórico
          </Button>
        </Link>
      </div>
    </div>
  )
}
