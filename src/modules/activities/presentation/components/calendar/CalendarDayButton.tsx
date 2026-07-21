'use client'

import { cn } from '@/shared/utils/cn'
import { isToday } from '../../utils/date.utils'
import { formatDateFull } from '../../utils/date.utils'

interface CalendarDayButtonProps {
  day: number
  date: Date
  activityCount: number
  isSelected: boolean
  isCurrentMonth: boolean
  onSelect: (date: Date) => void
}

export function CalendarDayButton({ day, date, activityCount, isSelected, isCurrentMonth, onSelect }: CalendarDayButtonProps) {
  const today = isToday(date)
  const accessibleLabel = `${formatDateFull(date)}, ${activityCount} ${activityCount === 1 ? 'atividade' : 'atividades'}`

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-label={accessibleLabel}
      aria-current={today ? 'date' : undefined}
      aria-selected={isSelected || undefined}
      className={cn(
        'relative w-full flex flex-col items-center justify-center py-2 rounded-md text-sm transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        !isCurrentMonth && 'text-text-muted/40',
        isCurrentMonth && !isSelected && 'text-text hover:bg-primary-lighter',
        isSelected && 'bg-primary text-white',
        today && !isSelected && 'ring-2 ring-primary ring-inset'
      )}
    >
      <span className="text-sm font-medium">{day}</span>
      {activityCount > 0 && (
        <span className={cn(
          'text-[10px] mt-0.5',
          isSelected ? 'text-white/80' : 'text-text-muted'
        )}>
          {activityCount} {activityCount === 1 ? 'ativ.' : 'ativs.'}
        </span>
      )}
    </button>
  )
}
