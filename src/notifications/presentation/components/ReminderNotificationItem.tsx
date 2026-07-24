'use client'

import { useCallback } from 'react'
import { Bell, Eye, X } from 'lucide-react'
import type { ReminderNotification } from '../types'
import { Button } from '@/presentation/components/ui/Button'

interface ReminderNotificationItemProps {
  notification: ReminderNotification
  onView: (activityId: string) => void
  onContinue?: (activityId: string) => void
  onDismiss: (activityId: string) => void
  dismissing?: boolean
  compact?: boolean
}

export function ReminderNotificationItem({
  notification,
  onView,
  onContinue,
  onDismiss,
  dismissing,
  compact,
}: ReminderNotificationItemProps) {
  const handleView = useCallback(() => onView(notification.activityId), [onView, notification.activityId])
  const handleContinue = useCallback(() => onContinue?.(notification.activityId), [onContinue, notification.activityId])
  const handleDismiss = useCallback(() => onDismiss(notification.activityId), [onDismiss, notification.activityId])

  const statusLabel = notification.status === 'upcoming' ? 'Próximo'
    : notification.status === 'due' ? 'Agora'
    : 'Lembrete atrasado'

  const timeStr = notification.remindAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const dateStr = notification.remindAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })

  return (
    <article
      className={`flex flex-col gap-2 p-3 rounded-md border ${
        !notification.readAt && (notification.status === 'due' || notification.status === 'overdue')
          ? 'border-accent bg-accent-light/30'
          : 'border-border'
      }`}
      aria-label={`${notification.title}, ${statusLabel}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Bell className={`w-4 h-4 ${!notification.readAt ? 'text-accent' : 'text-text-muted'}`} aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className={`text-sm truncate ${!notification.readAt ? 'font-semibold text-text' : 'text-text-secondary'}`}>
              {notification.title}
            </p>
            {!notification.readAt && (notification.status === 'due' || notification.status === 'overdue') && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            )}
          </div>

          <p className="text-xs text-text-muted line-clamp-1">{notification.message}</p>

          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-medium ${
              notification.status === 'due' ? 'text-accent'
              : notification.status === 'overdue' ? 'text-error'
              : 'text-text-muted'
            }`}>
              {statusLabel}
            </span>
            <span className="text-xs text-text-muted" aria-hidden="true">·</span>
            <time className="text-xs text-text-muted" dateTime={notification.remindAt.toISOString()}>
              {dateStr} {timeStr}
            </time>
          </div>
        </div>
      </div>

      <div className={`flex gap-2 ${compact ? 'flex-col' : ''}`}>
        <Button
          variant="primary"
          size="normal"
          onClick={handleView}
          icon={<Eye className="w-3.5 h-3.5" aria-hidden="true" />}
        >
          Ver atividade
        </Button>

        {onContinue && notification.status === 'due' && (
          <Button
            variant="outline"
            size="normal"
            onClick={handleContinue}
          >
            Continuar atividade
          </Button>
        )}

        <Button
          variant="ghost"
          size="normal"
          onClick={handleDismiss}
          disabled={dismissing}
          icon={<X className="w-3.5 h-3.5" aria-hidden="true" />}
          aria-label={`Dispensar lembrete de ${notification.title}`}
        >
          Dispensar
        </Button>
      </div>
    </article>
  )
}
