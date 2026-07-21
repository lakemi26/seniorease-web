'use client'

import { useAuth } from '@/presentation/hooks/useAuth'
import { Button } from '@/presentation/components/ui/Button'

interface ProfileNotFoundStateProps {
  onRetry: () => void
}

export function ProfileNotFoundState({ onRetry }: ProfileNotFoundStateProps) {
  const { signOut } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="alert">
      <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-warning" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-warning" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-text mb-2">Não foi possível encontrar seu perfil.</h2>
      <p className="text-sm text-text-muted mb-8 max-w-sm leading-relaxed">
        Entre novamente ou tente atualizar a página.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="large" onClick={onRetry}>
          Tentar novamente
        </Button>
        <Button variant="outline" size="large" onClick={() => signOut().then(() => window.location.replace('/login'))}>
          Sair da conta
        </Button>
      </div>
    </div>
  )
}
