'use client'

export type NotificationsFilter = 'all' | 'unread' | 'due' | 'overdue' | 'upcoming'

interface NotificationsFiltersProps {
  active: NotificationsFilter
  onChange: (filter: NotificationsFilter) => void
  isComplete: boolean
}

const COMPLETE_FILTERS: { key: NotificationsFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'unread', label: 'Não lidas' },
  { key: 'due', label: 'Agora' },
  { key: 'overdue', label: 'Atrasadas' },
  { key: 'upcoming', label: 'Próximas' },
]

const BASIC_FILTERS: { key: NotificationsFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'unread', label: 'Não lidas' },
]

export function NotificationsFilters({ active, onChange, isComplete }: NotificationsFiltersProps) {
  const filters = isComplete ? COMPLETE_FILTERS : BASIC_FILTERS

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar notificações">
      {filters.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          aria-pressed={active === f.key}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
            active === f.key
              ? 'bg-primary text-white border-primary'
              : 'bg-surface text-text-secondary border-border hover:bg-primary-light'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
