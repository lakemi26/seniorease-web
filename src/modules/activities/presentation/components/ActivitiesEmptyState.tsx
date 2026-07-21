'use client'

import Link from 'next/link'
import { Button } from '@/presentation/components/ui/Button'

interface ActivitiesEmptyStateProps {
  variant?: 'empty' | 'filter-empty'
}

export function ActivitiesEmptyState({ variant = 'empty' }: ActivitiesEmptyStateProps) {
  if (variant === 'filter-empty') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text mb-1">Nenhuma atividade encontrada.</h2>
        <p className="text-sm text-text-muted mb-6 max-w-sm">
          Altere os filtros ou faça uma nova busca.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-text mb-1">Você ainda não possui atividades.</h2>
      <p className="text-sm text-text-muted mb-6 max-w-sm">
        Adicione sua primeira atividade para começar a organizar sua rotina.
      </p>
      <Link href="/atividades/nova">
        <Button variant="primary" size="large">
          Criar primeira atividade
        </Button>
      </Link>
    </div>
  )
}
