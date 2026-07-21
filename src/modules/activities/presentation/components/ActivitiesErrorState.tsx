'use client'

import { Button } from '@/presentation/components/ui/Button'

interface ActivitiesErrorStateProps {
  onRetry: () => void
}

export function ActivitiesErrorState({ onRetry }: ActivitiesErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-danger-light flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-danger" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-danger" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-text mb-1">Não foi possível carregar suas atividades.</h2>
      <p className="text-sm text-text-muted mb-6 max-w-sm">
        Verifique sua conexão e tente novamente.
      </p>
      <Button variant="primary" size="large" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
