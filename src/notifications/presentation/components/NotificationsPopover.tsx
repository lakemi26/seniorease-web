'use client'

import { forwardRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNotifications } from '../hooks/useNotifications'
import { ReminderNotificationItem } from './ReminderNotificationItem'
import { Button } from '@/presentation/components/ui/Button'
import { Card } from '@/presentation/components/ui/Card'

interface NotificationsPopoverProps {
  onClose: () => void
  onViewAll: () => void
}

export const NotificationsPopover = forwardRef<HTMLDivElement, NotificationsPopoverProps>(
  function NotificationsPopover({ onClose, onViewAll }, ref) {
    const { dueNotifications, unreadCount, markAsRead, dismiss, markAllAsRead, isLoading, error } = useNotifications()
    const [dismissingId, setDismissingId] = useState<string | null>(null)
    const [markingAll, setMarkingAll] = useState(false)
    const router = useRouter()

    const maxDisplay = 5
    const displayItems = dueNotifications.slice(0, maxDisplay)

    const handleView = useCallback((activityId: string) => {
      markAsRead(activityId)
      onClose()
      router.push(`/atividades?modal=detalhes&id=${activityId}`)
    }, [markAsRead, onClose, router])

    const handleContinue = useCallback((activityId: string) => {
      markAsRead(activityId)
      onClose()
      router.push(`/atividades?modal=executar&id=${activityId}`)
    }, [markAsRead, onClose, router])

    const handleDismiss = useCallback(async (activityId: string) => {
      setDismissingId(activityId)
      try {
        await dismiss(activityId)
      } finally {
        setDismissingId(null)
      }
    }, [dismiss])

    const handleMarkAllAsRead = useCallback(async () => {
      setMarkingAll(true)
      try {
        await markAllAsRead()
      } finally {
        setMarkingAll(false)
      }
    }, [markAllAsRead])

    if (isLoading) {
      return (
        <div
          id="notifications-popover"
          role="region"
          aria-label="Notificações"
          ref={ref}
          className="absolute right-0 top-full mt-2 z-50 w-80 sm:w-96"
        >
          <Card variant="elevated" padding="normal">
            <p className="text-sm text-text-muted">Carregando notificações...</p>
          </Card>
        </div>
      )
    }

    if (error) {
      return (
        <div
          id="notifications-popover"
          role="region"
          aria-label="Notificações"
          ref={ref}
          className="absolute right-0 top-full mt-2 z-50 w-80 sm:w-96"
        >
          <Card variant="elevated" padding="normal">
            <p className="text-sm text-error">{error}</p>
          </Card>
        </div>
      )
    }

    return (
      <div
        id="notifications-popover"
        role="region"
        aria-label="Notificações"
        ref={ref}
        className="absolute right-0 top-full mt-2 z-50 w-80 sm:w-96"
      >
        <Card variant="elevated" padding="normal">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text">
              Notificações
              {unreadCount > 0 && (
                <span className="ml-1.5 text-xs font-normal text-text-muted">
                  ({unreadCount} não lidas)
                </span>
              )}
            </h3>
          </div>

          {displayItems.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm font-medium text-text">Nenhum lembrete agora.</p>
              <p className="text-xs text-text-muted mt-1">
                Seus lembretes aparecerão aqui quando chegar o horário.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-2 mb-3" role="list">
                {displayItems.map((n) => (
                  <li key={n.id}>
                    <ReminderNotificationItem
                      notification={n}
                      onView={handleView}
                      onContinue={handleContinue}
                      onDismiss={handleDismiss}
                      dismissing={dismissingId === n.activityId}
                      compact
                    />
                  </li>
                ))}
              </ul>

              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="normal"
                  onClick={handleMarkAllAsRead}
                  disabled={markingAll}
                  className="w-full mb-2"
                >
                  {markingAll ? 'Marcando...' : 'Marcar todas como lidas'}
                </Button>
              )}
            </>
          )}

          <Button
            variant="outline"
            size="normal"
            onClick={onViewAll}
            className="w-full"
          >
            Ver todas as notificações
          </Button>
        </Card>
      </div>
    )
  }
)
