'use client'

import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/presentation/components/ui/Button'

interface CalendarEmptyStateProps {
  variant: 'month' | 'day'
}

export function CalendarEmptyState({ variant }: CalendarEmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-4">
      <Calendar className="w-12 h-12 text-text-muted mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-text mb-2">
        {variant === 'month' ? 'Nenhuma atividade neste mês.' : 'Nenhuma atividade neste dia.'}
      </h2>
      <p className="text-sm text-text-muted mb-4">
        {variant === 'month'
          ? 'As atividades agendadas aparecerão aqui.'
          : 'Selecione outro dia para ver mais atividades.'}
      </p>
      <Link href="/ajuda?artigo=ver-atividades-calendario&origem=calendario">
        <Button variant="ghost" size="normal">
          Como usar o calendário
        </Button>
      </Link>
    </div>
  )
}
