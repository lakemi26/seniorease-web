'use client'

import { Button } from '@/presentation/components/ui/Button'
import type { Activity } from '../../../domain/entities'
import { ActivityHistoryItem } from './ActivityHistoryItem'

interface ActivityHistoryListProps {
  activities: Activity[]
  hasMore: boolean
  loadingMore: boolean
  onLoadMore: () => void
  onView: (id: string) => void
}

export function ActivityHistoryList({ activities, hasMore, loadingMore, onLoadMore, onView }: ActivityHistoryListProps) {
  if (activities.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2" role="list" aria-label="Atividades concluídas">
        {activities.map((activity) => (
          <div key={activity.id} role="listitem">
            <ActivityHistoryItem activity={activity} onView={onView} />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        {hasMore ? (
          <Button variant="outline" size="normal" onClick={onLoadMore} loading={loadingMore}>
            Carregar mais atividades
          </Button>
        ) : activities.length > 0 ? (
          <p className="text-xs text-text-muted">Você chegou ao final do histórico.</p>
        ) : null}
      </div>
    </div>
  )
}
