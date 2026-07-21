'use client'

import { useCallback } from 'react'
import { CalendarDayButton } from './CalendarDayButton'
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from '../../utils/date.utils'
import type { Activity } from '../../../domain/entities'

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

interface CalendarMonthGridProps {
  year: number
  month: number
  activities: Activity[]
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

function getActivityCountForDay(activities: Activity[], year: number, month: number, day: number): number {
  return activities.filter((a) => {
    const d = a.scheduledAt
    return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year
  }).length
}

export function CalendarMonthGrid({ year, month, activities, selectedDate, onSelectDate }: CalendarMonthGridProps) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = new Date()

  const handleSelect = useCallback((date: Date) => {
    onSelectDate(date)
  }, [onSelectDate])

  return (
    <div role="grid" aria-label="Calendário mensal">
      <div role="row" className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            role="columnheader"
            className="text-center text-xs font-medium text-text-muted py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div role="rowgroup" className="grid grid-cols-7 gap-px bg-border">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[3.5rem] bg-surface" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const date = new Date(year, month, day)
          const isCurrentMonth = date.getMonth() === month
          const activityCount = getActivityCountForDay(activities, year, month, day)
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false

          return (
            <div key={day} className="bg-surface min-h-[3.5rem]">
              <CalendarDayButton
                day={day}
                date={date}
                activityCount={activityCount}
                isSelected={isSelected}
                isCurrentMonth={isCurrentMonth}
                onSelect={handleSelect}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
