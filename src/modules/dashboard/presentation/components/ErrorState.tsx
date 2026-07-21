'use client'

import { Button } from '@/presentation/components/ui/Button'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'

interface ErrorStateProps {
  onRetry: () => void
  message?: string
}

export function ErrorState({ onRetry, message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center" role="alert">
      <AccessibleAlert
        variant="error"
        message={message || 'Não foi possível carregar o dashboard.'}
      />
      <p className="text-sm text-text-muted mt-3 mb-6">
        Verifique sua conexão e tente novamente.
      </p>
      <Button variant="primary" size="normal" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
