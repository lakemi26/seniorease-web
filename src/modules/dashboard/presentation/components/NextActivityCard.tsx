'use client'

import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { ActivityStatusBadge } from '@/modules/activities/presentation/components/ActivityStatusBadge'
import { EmptyState } from './EmptyState'
import { formatDate, formatTime, completedStepsCount, getCategoryLabel } from '@/modules/activities/presentation/utils/activity.utils'
import type { Activity } from '@/modules/activities/domain/entities'

interface NextActivityCardProps {
  activity: Activity | null
  onViewActivity?: () => void
  onAddActivity?: () => void
}

export function NextActivityCard({ activity, onViewActivity, onAddActivity }: NextActivityCardProps) {
  if (!activity) {
    return (
      <Card variant="outlined" padding="normal" ariaLabel="Próxima atividade">
        <EmptyState
          title="Você não possui atividades próximas."
          description="Adicione uma atividade para organizar seus próximos compromissos."
          actionLabel="Adicionar atividade"
          onAction={onAddActivity}
        />
      </Card>
    )
  }

  const stepsTotal = activity.steps.length
  const stepsDone = completedStepsCount(activity.steps)

  return (
    <Card variant="outlined" padding="normal" ariaLabel="Próxima atividade" className="border-primary/30">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Próxima atividade</p>
          <ActivityStatusBadge status={activity.status} />
        </div>

        <h3 className="text-xl font-semibold text-text">{activity.title}</h3>

        <p className="text-sm text-text-muted">{getCategoryLabel(activity.category)}</p>

        {activity.scheduledAt && (
          <p className="text-sm text-text-secondary">
            {formatDate(activity.scheduledAt)}
            {activity.hasTime ? <> às {formatTime(activity.scheduledAt)}</> : ''}
          </p>
        )}

        {activity.description && (
          <p className="text-sm text-text-secondary line-clamp-2">{activity.description}</p>
        )}

        {stepsTotal > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">{stepsDone} de {stepsTotal} etapas concluídas</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={stepsDone}
              aria-valuemin={0}
              aria-valuemax={stepsTotal}
              aria-label={`${stepsDone} de ${stepsTotal} etapas concluídas`}
              className="w-full h-2 bg-border rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-normal"
                style={{ width: `${(stepsDone / stepsTotal) * 100}%` }}
              />
            </div>
          </div>
        )}

        {activity.reminder.enabled && (
          <p className="text-xs text-accent flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Lembrete ativo
          </p>
        )}

        <div className="pt-2">
          {activity.status === 'inProgress' ? (
            <Button variant="primary" size="normal" onClick={onViewActivity}>
              Continuar atividade
            </Button>
          ) : (
            <Button variant="primary" size="normal" onClick={onViewActivity}>
              Ver atividade
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
