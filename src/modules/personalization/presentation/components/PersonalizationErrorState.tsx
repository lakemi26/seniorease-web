'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'

interface PersonalizationErrorStateProps {
  onRetry: () => void
}

export function PersonalizationErrorState({ onRetry }: PersonalizationErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center" role="alert">
      <AlertTriangle className="w-12 h-12 text-danger" aria-hidden="true" />
      <h2 className="text-xl font-bold text-text">Não foi possível carregar suas preferências.</h2>
      <p className="text-sm text-text-muted max-w-md">
        Verifique sua conexão e tente novamente.
      </p>
      <Button variant="primary" size="normal" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
