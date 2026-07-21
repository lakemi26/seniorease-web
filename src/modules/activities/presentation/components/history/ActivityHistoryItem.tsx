'use client'

import { CheckCircle } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import type { Activity } from '../../../domain/entities'
import { getCategoryLabel } from '../../utils/activity.utils'
import { formatDateFull, formatTime } from '../../utils/date.utils'
import { completedStepsCount } from '../../utils/activity.utils'

interface ActivityHistoryItemProps {
  activity: Activity
  onView: (id: string) => void
}

export function ActivityHistoryItem({ activity, onView }: ActivityHistoryItemProps) {
  const stepsDone = completedStepsCount(activity.steps)

  return (
    <div className="flex items-start gap-3 p-4 rounded-md border border-border bg-surface hover:bg-primary-lighter transition-colors">
      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{activity.title}</p>
        <p className="text-xs text-text-muted mt-0.5">{getCategoryLabel(activity.category)}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-text-muted">
          {activity.completedAt && (
            <span>
              Concluída em {formatDateFull(activity.completedAt)}
              {formatTime(activity.completedAt) && <> às {formatTime(activity.completedAt)}</>}
            </span>
          )}
          <span>Original: {formatDateFull(activity.scheduledAt)}</span>
          {activity.steps.length > 0 && (
            <span>{stepsDone}/{activity.steps.length} etapas</span>
          )}
        </div>
      </div>
      <Button variant="outline" size="normal" onClick={() => onView(activity.id)}>
        Ver detalhes
      </Button>
    </div>
  )
}
