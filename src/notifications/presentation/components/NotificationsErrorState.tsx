'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'

interface NotificationsErrorStateProps {
  onRetry: () => void
}

export function NotificationsErrorState({ onRetry }: NotificationsErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle className="w-12 h-12 text-error mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-text mb-1">Não foi possível carregar as notificações.</h2>
      <p className="text-sm text-text-muted max-w-sm mb-4">
        Verifique sua conexão e tente novamente.
      </p>
      <Button variant="primary" size="normal" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
