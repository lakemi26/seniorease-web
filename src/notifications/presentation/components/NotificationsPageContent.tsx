'use client'

import { useMemo, useState, useCallback, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useNotifications } from '../hooks/useNotifications'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { ReminderNotificationItem } from './ReminderNotificationItem'
import { NotificationsFilters, type NotificationsFilter } from './NotificationsFilters'
import { NotificationsEmptyState } from './NotificationsEmptyState'
import { NotificationsDisabledState } from './NotificationsDisabledState'
import { NotificationsSkeleton } from './NotificationsSkeleton'
import { NotificationsErrorState } from './NotificationsErrorState'
import { PreferencesContext } from '@/presentation/providers/PreferencesProvider'
import { Button } from '@/presentation/components/ui/Button'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'

function groupLabel(status: string): string {
  switch (status) {
    case 'due': return 'Agora'
    case 'overdue': return 'Atrasados'
    case 'upcoming': return 'Próximos'
    default: return ''
  }
}

export function NotificationsPageContent() {
  const {
    notifications,
    dueNotifications,
    upcomingNotifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    dismiss,
    markAllAsRead,
    retry,
  } = useNotifications()
  const { preferences } = useContext(PreferencesContext)
  const { interface: interfaceMode } = useAccessibility()
  const router = useRouter()
  const [dismissingId, setDismissingId] = useState<string | null>(null)
  const [markingAll, setMarkingAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState<NotificationsFilter>('all')

  const isComplete = interfaceMode === 'complete'
  const remindersEnabled = preferences.remindersEnabled

  const handleView = useCallback((activityId: string) => {
    markAsRead(activityId)
    router.push(`/atividades?modal=detalhes&id=${activityId}`)
  }, [markAsRead, router])

  const handleContinue = useCallback((activityId: string) => {
    markAsRead(activityId)
    router.push(`/atividades?modal=executar&id=${activityId}`)
  }, [markAsRead, router])

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

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications
    if (activeFilter === 'unread') return notifications.filter((n) => !n.readAt && !n.dismissedAt)
    return notifications.filter((n) => n.status === activeFilter)
  }, [notifications, activeFilter])

  const dueNotificationsFiltered = useMemo(
    () => filteredNotifications.filter((n) => n.status === 'due'),
    [filteredNotifications]
  )

  const overdueNotificationsFiltered = useMemo(
    () => filteredNotifications.filter((n) => n.status === 'overdue'),
    [filteredNotifications]
  )

  const upcomingNotificationsFiltered = useMemo(
    () => filteredNotifications.filter((n) => n.status === 'upcoming'),
    [filteredNotifications]
  )

  const readNotifications = useMemo(
    () => notifications.filter((n) => n.readAt && !n.dismissedAt),
    [notifications]
  )

  if (!remindersEnabled) {
    return <NotificationsDisabledState />
  }

  if (isLoading) {
    return (
      <div role="status" aria-label="Carregando suas notificações.">
        <NotificationsSkeleton />
      </div>
    )
  }

  if (error) {
    return <NotificationsErrorState onRetry={retry} />
  }

  const showHeader = isComplete || notifications.length > 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <NotificationsFilters
          active={activeFilter}
          onChange={setActiveFilter}
          isComplete={isComplete}
        />

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="normal"
            onClick={handleMarkAllAsRead}
            disabled={markingAll}
          >
            {markingAll ? 'Marcando...' : 'Marcar todas como lidas'}
          </Button>
        )}
      </div>

      {unreadCount > 0 && (
        <AccessibleAlert
          variant="info"
          message={`${unreadCount} notificação${unreadCount > 1 ? 'ões' : ''} não lida${unreadCount > 1 ? 's' : ''}.`}
        />
      )}

      {filteredNotifications.length === 0 ? (
        <NotificationsEmptyState />
      ) : (
        <div className="space-y-8">
          {dueNotificationsFiltered.length > 0 && (
            <section aria-labelledby="section-due">
              <h2 id="section-due" className="text-sm font-semibold text-text mb-3 uppercase tracking-wider">
                {groupLabel('due')}
              </h2>
              <ul className="space-y-3" role="list">
                {dueNotificationsFiltered.map((n) => (
                  <li key={n.id}>
                    <ReminderNotificationItem
                      notification={n}
                      onView={handleView}
                      onContinue={isComplete ? handleContinue : undefined}
                      onDismiss={handleDismiss}
                      dismissing={dismissingId === n.activityId}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {overdueNotificationsFiltered.length > 0 && (
            <section aria-labelledby="section-overdue">
              <h2 id="section-overdue" className="text-sm font-semibold text-text mb-3 uppercase tracking-wider">
                {groupLabel('overdue')}
              </h2>
              <ul className="space-y-3" role="list">
                {overdueNotificationsFiltered.map((n) => (
                  <li key={n.id}>
                    <ReminderNotificationItem
                      notification={n}
                      onView={handleView}
                      onContinue={isComplete ? handleContinue : undefined}
                      onDismiss={handleDismiss}
                      dismissing={dismissingId === n.activityId}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {upcomingNotificationsFiltered.length > 0 && (
            <section aria-labelledby="section-upcoming">
              <h2 id="section-upcoming" className="text-sm font-semibold text-text mb-3 uppercase tracking-wider">
                {groupLabel('upcoming')}
              </h2>
              <ul className="space-y-3" role="list">
                {upcomingNotificationsFiltered.map((n) => (
                  <li key={n.id}>
                    <ReminderNotificationItem
                      notification={n}
                      onView={handleView}
                      onContinue={undefined}
                      onDismiss={handleDismiss}
                      dismissing={dismissingId === n.activityId}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isComplete && readNotifications.length > 0 && (
            <section aria-labelledby="section-read">
              <h2 id="section-read" className="text-sm font-semibold text-text mb-3 uppercase tracking-wider">
                Lidos
              </h2>
              <ul className="space-y-3" role="list">
                {readNotifications.map((n) => (
                  <li key={n.id}>
                    <ReminderNotificationItem
                      notification={n}
                      onView={handleView}
                      onContinue={undefined}
                      onDismiss={handleDismiss}
                      dismissing={dismissingId === n.activityId}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
