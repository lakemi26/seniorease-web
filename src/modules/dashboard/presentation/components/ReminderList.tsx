'use client'

import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { ReminderCard } from '@/modules/activities/presentation/components/reminders/ReminderCard'
import { ReminderEmptyState } from '@/modules/activities/presentation/components/reminders/ReminderEmptyState'
import { ReminderSkeleton } from '@/modules/activities/presentation/components/reminders/ReminderSkeleton'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import type { Activity } from '@/modules/activities/domain/entities'

interface ReminderListProps {
  reminders: Activity[]
  loading: boolean
  error: string | null
  dismissingId: string | null
  onView: (id: string) => void
  onContinue?: (id: string) => void
  onDismiss: (id: string) => void
  maxItems?: number
}

export function ReminderList({
  reminders,
  loading,
  error,
  dismissingId,
  onView,
  onContinue,
  onDismiss,
  maxItems = 5,
}: ReminderListProps) {
  const displayReminders = reminders.slice(0, maxItems)

  if (!loading && reminders.length === 0) return null

  return (
    <section aria-labelledby="reminders-heading">
      <SectionHeader
        title="Lembretes"
        align="left"
        className="mb-3"
      />

      <Card variant="outlined" padding="normal">
        {loading ? (
          <ReminderSkeleton />
        ) : error ? (
          <AccessibleAlert variant="error" message={error} />
        ) : displayReminders.length === 0 ? (
          <ReminderEmptyState />
        ) : (
          <ul className="space-y-3" role="list">
            {displayReminders.map((activity) => (
              <li key={activity.id}>
                <ReminderCard
                  activity={activity}
                  onView={onView}
                  onContinue={onContinue}
                  onDismiss={onDismiss}
                  dismissing={dismissingId === activity.id}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  )
}
