'use client'

import { CheckCircle, Circle } from 'lucide-react'
import type { Activity } from '../../domain/entities'
import {
  formatDate,
  formatTime,
  formatDateShort,
  getPriorityLabel,
  getCategoryLabel,
  completedStepsCount,
} from '../utils/activity.utils'
import { ActivityStatusBadge } from './ActivityStatusBadge'
import { ActivityProgress } from './ActivityProgress'

interface ActivityDetailsProps {
  activity: Activity
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  const stepsDone = completedStepsCount(activity.steps)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-text break-words flex-1 min-w-0">
          {activity.title}
        </h2>
        <ActivityStatusBadge status={activity.status} />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-text">Categoria:</span>
          <span>{getCategoryLabel(activity.category)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-text">Prioridade:</span>
          <span>{getPriorityLabel(activity.priority)}</span>
        </div>
      </div>

      <div className="text-sm text-text-secondary">
        <span className="font-medium text-text">Data:</span>{' '}
        {formatDate(activity.scheduledAt)}
        {activity.hasTime ? (
          <span> às {formatTime(activity.scheduledAt)}</span>
        ) : (
          <span className="text-text-muted"> — Sem horário definido</span>
        )}
      </div>

      {activity.description && (
        <div className="text-sm text-text-secondary whitespace-pre-wrap">
          {activity.description}
        </div>
      )}

      {activity.steps.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text">Etapas</h3>
            <span className="text-xs text-text-muted">
              {stepsDone} de {activity.steps.length}
            </span>
          </div>

          <ActivityProgress done={stepsDone} total={activity.steps.length} />

          <ul role="list" className="flex flex-col gap-2">
            {activity.steps
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((step) => (
                <li key={step.id} className="flex items-start gap-2">
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm ${
                        step.completed
                          ? 'text-text-muted line-through'
                          : 'text-text'
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.completed && step.completedAt && (
                      <span className="text-xs text-text-muted">
                        Concluída em {formatDateShort(step.completedAt)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}

      {activity.reminder.enabled && activity.reminder.remindAt && (
        <div className="text-sm text-text-secondary">
          <span className="font-medium text-text">Lembrete ativo</span> —{' '}
          {formatDate(activity.reminder.remindAt)}{' '}
          {formatTime(activity.reminder.remindAt)}
        </div>
      )}

      <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-text-muted border-t border-border pt-4">
        <span>
          Criada em {formatDate(activity.createdAt)} às{' '}
          {formatTime(activity.createdAt)}
        </span>
        <span>
          Atualizada em {formatDate(activity.updatedAt)} às{' '}
          {formatTime(activity.updatedAt)}
        </span>
        {activity.startedAt && (
          <span>
            Iniciada em {formatDate(activity.startedAt)} às{' '}
            {formatTime(activity.startedAt)}
          </span>
        )}
        {activity.completedAt && (
          <span>
            Concluída em {formatDate(activity.completedAt)} às{' '}
            {formatTime(activity.completedAt)}
          </span>
        )}
      </div>
    </div>
  )
}
