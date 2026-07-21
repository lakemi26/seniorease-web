'use client'

import type { Activity } from '../../domain/entities'
import { ActivityStatusBadge } from './ActivityStatusBadge'

function isActivityDelayed(activity: Activity): boolean {
  if (activity.status === 'completed' || activity.status === 'cancelled') return false
  if (!activity.scheduledAt) return false
  return activity.scheduledAt < new Date()
}

function formatTime(date: Date | null): string {
  if (!date) return 'Sem horário definido'
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function ActivityListItem({ activity }: { activity: Activity }) {
  const delayed = isActivityDelayed(activity)

  return (
    <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-surface hover:bg-primary-lighter transition-colors duration-normal">
      <div className="flex flex-col items-center min-w-[4rem] pt-0.5">
        <span className="text-sm font-medium text-text-secondary">
          {formatTime(activity.scheduledAt)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text truncate">{activity.title}</p>
        <p className="text-xs text-text-muted mt-0.5">
          {activity.category}
          {activity.steps.length > 0 && (
            <span className="ml-2">
              · {activity.steps.filter((s) => s.completed).length}/{activity.steps.length} etapas
            </span>
          )}
        </p>
      </div>

      <div className="flex-shrink-0 self-center">
        <ActivityStatusBadge status={activity.status} isDelayed={delayed} />
      </div>
    </div>
  )
}
