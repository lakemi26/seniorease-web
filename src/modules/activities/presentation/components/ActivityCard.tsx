'use client'

import { Card } from '@/presentation/components/ui/Card'
import { ActivityStatusBadge } from './ActivityStatusBadge'
import { ActivityProgress } from './ActivityProgress'
import {
  isActivityDelayed,
  formatDate,
  formatTime,
  completedStepsCount,
  getCategoryLabel,
} from '../utils/activity.utils'
import type { Activity } from '../../domain/entities'

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const delayed = isActivityDelayed(activity)
  const stepsCount = activity.steps.length
  const stepsDone = completedStepsCount(activity.steps)

  return (
    <Card variant="outlined" padding="compact" className="hover:bg-primary-lighter transition-colors duration-normal">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-text truncate">{activity.title}</h3>
            <p className="text-xs text-text-muted mt-0.5">{getCategoryLabel(activity.category)}</p>
          </div>
          <ActivityStatusBadge status={activity.status} isDelayed={delayed} />
        </div>

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span>{formatDate(activity.scheduledAt)}</span>
          {activity.hasTime && <span>{formatTime(activity.scheduledAt)}</span>}
          {!activity.hasTime && <span>Sem horário definido</span>}
        </div>

        {stepsCount > 0 && (
          <ActivityProgress done={stepsDone} total={stepsCount} />
        )}

        {activity.description && (
          <p className="text-xs text-text-muted line-clamp-2">{activity.description}</p>
        )}
      </div>
    </Card>
  )
}
