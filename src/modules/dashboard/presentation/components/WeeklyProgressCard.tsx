'use client'

import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import type { WeeklySummary } from '@/modules/activities/domain/entities'

interface WeeklyProgressCardProps {
  summary: WeeklySummary | null
}

export function WeeklyProgressCard({ summary }: WeeklyProgressCardProps) {
  if (!summary || summary.total === 0) return null

  const percentage = Math.round((summary.completed / summary.total) * 100)

  return (
    <section aria-labelledby="weekly-heading">
      <SectionHeader
        title="Resumo da semana"
        align="left"
        className="mb-3"
      />

      <Card variant="outlined" padding="normal">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{summary.completed}</p>
              <p className="text-xs text-text-muted">Concluídas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{summary.pending}</p>
              <p className="text-xs text-text-muted">Pendentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{summary.inProgress}</p>
              <p className="text-xs text-text-muted">Em andamento</p>
            </div>
          </div>

          <div
            role="progressbar"
            aria-valuenow={summary.completed}
            aria-valuemin={0}
            aria-valuemax={summary.total}
            aria-label={`${summary.completed} de ${summary.total} atividades concluídas`}
            className="w-full h-2.5 bg-border rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-success rounded-full transition-all duration-normal"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-sm text-text-secondary text-center">
            Você concluiu {summary.completed} de {summary.total} atividades nesta semana.
          </p>
        </div>
      </Card>
    </section>
  )
}
