'use client'

import { Button } from '@/presentation/components/ui/Button'
import { ActivityStatusBadge } from '../ActivityStatusBadge'
import type { Activity } from '../../../domain/entities'
import { getCategoryLabel, formatTime } from '../../utils/activity.utils'
import { sortActivities } from '../../utils/activity.utils'

interface ActivityAgendaItemProps {
  activity: Activity
  onViewDetails: (id: string) => void
}

export function ActivityAgendaItem({ activity, onViewDetails }: ActivityAgendaItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-surface hover:bg-primary-lighter transition-colors">
      {activity.hasTime && (
        <div className="min-w-[4rem] pt-0.5">
          <span className="text-sm font-medium text-text-secondary">
            {formatTime(activity.scheduledAt)}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{activity.title}</p>
        <p className="text-xs text-text-muted mt-0.5">{getCategoryLabel(activity.category)}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <ActivityStatusBadge status={activity.status} />
        <Button variant="ghost" size="normal" onClick={() => onViewDetails(activity.id)}>
          Detalhes
        </Button>
      </div>
    </div>
  )
}
