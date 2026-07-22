'use client'

import { FileQuestion } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import { cn } from '@/shared/utils/cn'

interface HelpArticleNotFoundProps {
  onGoBack: () => void
  onSearch: () => void
  className?: string
}

export function HelpArticleNotFound({ onGoBack, onSearch, className }: HelpArticleNotFoundProps) {
  return (
    <div className={cn('flex flex-col items-center text-center py-12 px-4', className)} role="status">
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <FileQuestion className="w-7 h-7 text-primary" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-text mb-2">Orientação não encontrada.</h2>
      <p className="text-sm text-text-muted max-w-sm mb-6">
        Esta orientação pode ter sido alterada ou não está disponível.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="normal" onClick={onGoBack}>
          Voltar para a ajuda
        </Button>
        <Button variant="outline" size="normal" onClick={onSearch}>
          Buscar outra orientação
        </Button>
      </div>
    </div>
  )
}
