'use client'

import type { CalendarView } from '../../hooks/useCalendarActivities'

interface CalendarViewSwitcherProps {
  view: CalendarView
  onChange: (view: CalendarView) => void
}

export function CalendarViewSwitcher({ view, onChange }: CalendarViewSwitcherProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-border p-1" role="tablist" aria-label="Visualização do calendário">
      <button
        type="button"
        role="tab"
        aria-selected={view === 'agenda'}
        aria-pressed={view === 'agenda'}
        onClick={() => onChange('agenda')}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
          view === 'agenda'
            ? 'bg-surface text-text shadow-sm'
            : 'text-text-muted hover:text-text'
        }`}
      >
        Agenda
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === 'month'}
        aria-pressed={view === 'month'}
        onClick={() => onChange('month')}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
          view === 'month'
            ? 'bg-surface text-text shadow-sm'
            : 'text-text-muted hover:text-text'
        }`}
      >
        Mês
      </button>
    </div>
  )
}
