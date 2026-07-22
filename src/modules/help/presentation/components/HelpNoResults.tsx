'use client'

import { SearchX } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import { cn } from '@/shared/utils/cn'

interface HelpNoResultsProps {
  query: string
  onClearSearch: () => void
  onViewCategories: () => void
  className?: string
}

export function HelpNoResults({ query, onClearSearch, onViewCategories, className }: HelpNoResultsProps) {
  return (
    <div className={cn('flex flex-col items-center text-center py-12 px-4', className)} role="status">
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7 text-primary" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-text mb-2">Não encontramos essa orientação.</h2>
      <p className="text-sm text-text-muted max-w-sm mb-6">
        Tente usar palavras mais simples ou consulte as categorias abaixo.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="normal" onClick={onClearSearch}>
          Limpar busca
        </Button>
        <Button variant="outline" size="normal" onClick={onViewCategories}>
          Ver todas as categorias
        </Button>
      </div>
    </div>
  )
}
