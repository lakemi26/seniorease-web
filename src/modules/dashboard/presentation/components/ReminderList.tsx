'use client'

import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import type { Activity } from '@/modules/activities/domain/entities'

interface ReminderListProps {
  activities: Activity[]
  onViewActivity?: (id: string) => void
}

function formatReminderTime(scheduledAt: Date | null): string {
  if (!scheduledAt) return ''
  const now = new Date()
  const diffMs = scheduledAt.getTime() - now.getTime()
  const diffMinutes = Math.round(diffMs / 60000)

  if (diffMinutes <= 0) return 'Agora'
  if (diffMinutes < 60) return `Em ${diffMinutes} minutos`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours === 1) return 'Em 1 hora'

  return `Em ${diffHours} horas`
}

export function ReminderList({ activities, onViewActivity }: ReminderListProps) {
  const reminders = activities.filter((a) => a.reminder.enabled)

  if (reminders.length === 0) return null

  return (
    <section aria-labelledby="reminders-heading">
      <SectionHeader
        title="Lembretes"
        align="left"
        className="mb-3"
      />

      <Card variant="outlined" padding="normal">
        <ul className="space-y-3" role="list">
          {reminders.map((activity) => (
            <li key={activity.id}>
              <button
                type="button"
                onClick={() => onViewActivity?.(activity.id)}
                className="w-full flex items-start gap-3 p-3 rounded-md border border-border bg-surface hover:bg-primary-lighter transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text">{activity.title}</p>
                  <p className="text-xs text-accent mt-0.5">
                    {formatReminderTime(activity.scheduledAt)}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
