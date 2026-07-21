'use client'

import { useEffect } from 'react'
import { Button } from '@/presentation/components/ui/Button'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[dashboard] page error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <LiveRegion message="Erro ao carregar o dashboard." />
      <div className="text-center" role="alert">
        <div className="w-16 h-16 rounded-full bg-danger-light flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-danger" />
            <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-danger" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-text mb-2">
          Não foi possível carregar o dashboard.
        </h1>
        <p className="text-sm text-text-muted mb-6">
          Verifique sua conexão e tente novamente.
        </p>
        <Button variant="primary" size="large" onClick={reset}>
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}
