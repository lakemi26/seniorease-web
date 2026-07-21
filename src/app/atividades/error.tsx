'use client'

import { Button } from '@/presentation/components/ui/Button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AtividadesError({ error: _error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-danger-light flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-danger" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-danger" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Não foi possível carregar suas atividades.</h1>
        <p className="text-sm text-text-muted mb-8 leading-relaxed">
          Verifique sua conexão e tente novamente.
        </p>
        <Button variant="primary" size="large" onClick={reset}>
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}
