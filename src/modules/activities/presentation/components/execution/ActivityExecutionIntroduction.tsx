'use client'

import { Button } from '@/presentation/components/ui/Button'
import type { Activity } from '../../../domain/entities'
import { getCategoryLabel, formatDate, formatTime, completedStepsCount } from '../../utils/activity.utils'

interface ActivityExecutionIntroductionProps {
  activity: Activity
  onStart: () => void
  onClose: () => void
  saving: boolean
}

export function ActivityExecutionIntroduction({ activity, onStart, onClose, saving }: ActivityExecutionIntroductionProps) {
  const stepsDone = completedStepsCount(activity.steps)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-text">{activity.title}</h3>
        <p className="text-sm text-text-muted">{getCategoryLabel(activity.category)}</p>
      </div>

      <div className="text-sm text-text-secondary">
        {formatDate(activity.scheduledAt)}
        {activity.hasTime && <> às {formatTime(activity.scheduledAt)}</>}
      </div>

      {activity.description && (
        <p className="text-sm text-text-secondary whitespace-pre-wrap">{activity.description}</p>
      )}

      {stepsDone > 0 && (
        <p className="text-sm text-text-muted">
          Você concluiu {stepsDone} de {activity.steps.length} etapas.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-4 border-t border-border">
        <Button variant="primary" size="large" onClick={onStart} loading={saving}>
          {stepsDone > 0 ? 'Continuar atividade' : 'Começar atividade'}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Voltar
        </Button>
      </div>
    </div>
  )
}
