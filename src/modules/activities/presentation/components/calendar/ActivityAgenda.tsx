'use client'

import { ActivityAgendaItem } from './ActivityAgendaItem'
import { sortActivities } from '../../utils/activity.utils'
import { formatDateWeekday } from '../../utils/date.utils'
import type { Activity } from '../../../domain/entities'

interface ActivityAgendaProps {
  activities: Activity[]
  onViewDetails: (id: string) => void
}

interface DayGroup {
  date: Date
  label: string
  activities: Activity[]
}

function groupByDay(activities: Activity[]): DayGroup[] {
  const sorted = sortActivities(activities)
  const groups = new Map<string, DayGroup>()

  for (const activity of sorted) {
    const key = `${activity.scheduledAt.getFullYear()}-${activity.scheduledAt.getMonth()}-${activity.scheduledAt.getDate()}`
    if (!groups.has(key)) {
      groups.set(key, {
        date: activity.scheduledAt,
        label: formatDateWeekday(activity.scheduledAt),
        activities: [],
      })
    }
    groups.get(key)!.activities.push(activity)
  }

  return Array.from(groups.values())
}

export function ActivityAgenda({ activities, onViewDetails }: ActivityAgendaProps) {
  if (activities.length === 0) return null

  const groups = groupByDay(activities)

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.date.toISOString()}>
          <h3 className="text-sm font-semibold text-text mb-3">{group.label}</h3>
          <div className="flex flex-col gap-2">
            {group.activities.map((activity) => (
              <ActivityAgendaItem
                key={activity.id}
                activity={activity}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
