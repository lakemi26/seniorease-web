'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { ActivityListItem } from '@/modules/activities/presentation/components/ActivityListItem'
import type { Activity } from '@/modules/activities/domain/entities'

interface RecentHistoryProps {
  activities: Activity[]
}



export function RecentHistory({ activities }: RecentHistoryProps) {
  const router = useRouter()

  if (activities.length === 0) return null

  return (
    <section aria-labelledby="recent-heading">
      <SectionHeader
        title="Concluídas recentemente"
        align="left"
        className="mb-3"
      />

      <Card variant="outlined" padding="normal">
        <ul className="space-y-2" role="list">
          {activities.map((activity) => (
            <li key={activity.id}>
              <button
                type="button"
                onClick={() => router.push(`/atividades?modal=detalhes&id=${activity.id}`)}
                className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-md"
              >
                <ActivityListItem activity={activity} />
              </button>
            </li>
          ))}
        </ul>

        {activities.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => router.push('/historico')}
              className="text-sm font-medium text-primary hover:text-primary-dark underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
            >
              Ver histórico completo
            </button>
          </div>
        )}
      </Card>
    </section>
  )
}
