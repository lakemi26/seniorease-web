'use client'

import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { ActivityListItem } from '@/modules/activities/presentation/components/ActivityListItem'
import { EmptyState } from './EmptyState'
import type { Activity } from '@/modules/activities/domain/entities'

interface TodayActivitiesSectionProps {
  activities: Activity[]
  onViewActivity?: (id: string) => void
  onAddActivity?: () => void
}

export function TodayActivitiesSection({ activities, onViewActivity, onAddActivity }: TodayActivitiesSectionProps) {
  return (
    <section aria-labelledby="today-heading">
      <SectionHeader
        title="Atividades de hoje"
        align="left"
        className="mb-3"
      />

      <Card variant="outlined" padding="normal">
        {activities.length === 0 ? (
          <EmptyState
            title="Nenhuma atividade para hoje."
            description="Você pode aproveitar o dia ou adicionar uma nova atividade."
            actionLabel="Adicionar atividade"
            onAction={onAddActivity}
          />
        ) : (
          <ul className="space-y-2" role="list">
            {activities.map((activity) => (
              <li key={activity.id}>
                <button
                  type="button"
                  onClick={() => onViewActivity?.(activity.id)}
                  className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-md"
                >
                  <ActivityListItem activity={activity} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  )
}
