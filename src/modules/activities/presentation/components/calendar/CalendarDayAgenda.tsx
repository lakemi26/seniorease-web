'use client'

import { ActivityAgendaItem } from './ActivityAgendaItem'
import { formatDateFull } from '../../utils/date.utils'
import type { Activity } from '../../../domain/entities'

interface CalendarDayAgendaProps {
  date: Date
  activities: Activity[]
  onViewDetails: (id: string) => void
}

export function CalendarDayAgenda({ date, activities, onViewDetails }: CalendarDayAgendaProps) {
  if (activities.length === 0) return null

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-text mb-3" tabIndex={-1}>
        Atividades de {formatDateFull(date)}
      </h3>
      <div className="flex flex-col gap-2">
        {activities.map((activity) => (
          <ActivityAgendaItem
            key={activity.id}
            activity={activity}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  )
}
