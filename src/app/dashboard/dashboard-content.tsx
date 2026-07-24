'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { useDashboard } from '@/modules/dashboard/presentation/hooks/useDashboard'
import { DashboardLayout } from '@/modules/dashboard/presentation/components/DashboardLayout'
import { DashboardSkeleton } from '@/modules/dashboard/presentation/components/DashboardSkeleton'
import { useNotifications } from '@/notifications/presentation/hooks/useNotifications'
import { ErrorState } from '@/modules/dashboard/presentation/components/ErrorState'
import { WelcomeSection } from '@/modules/dashboard/presentation/components/WelcomeSection'
import { NextActivityCard } from '@/modules/dashboard/presentation/components/NextActivityCard'
import { TodayActivitiesSection } from '@/modules/dashboard/presentation/components/TodayActivitiesSection'
import { QuickActions } from '@/modules/dashboard/presentation/components/QuickActions'
import { ContinueActivitySection } from '@/modules/dashboard/presentation/components/ContinueActivitySection'
import { WeeklyProgressCard } from '@/modules/dashboard/presentation/components/WeeklyProgressCard'
import { ReminderList } from '@/modules/dashboard/presentation/components/ReminderList'
import { RecentHistory } from '@/modules/dashboard/presentation/components/RecentHistory'
import { HelpCard } from '@/modules/dashboard/presentation/components/HelpCard'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

function DashboardInner() {
  const { user, profile } = useAuth()
  const { interface: interfaceMode } = useAccessibility()
  const {
    nextActivity,
    todayActivities,
    inProgressActivities,
    recentCompleted,
    weeklySummary,
    loading,
    error,
    retry,
  } = useDashboard()

  const {
    dueNotifications,
    isLoading,
    error: notifError,
    markAsRead,
    dismiss,
  } = useNotifications()

  const [dismissingId, setDismissingId] = useState<string | null>(null)

  const dueReminders = dueNotifications.map((n) => ({
    id: n.activityId,
    title: n.title,
    scheduledAt: n.scheduledAt,
    status: n.status === 'upcoming' ? 'pending' as const : 'inProgress' as const,
    reminder: { enabled: true, remindAt: n.remindAt, readAt: n.readAt, dismissedAt: n.dismissedAt },
    priority: 'medium' as const,
    hasTime: true,
    userId: user?.uid ?? '',
    description: null,
    category: 'personal' as const,
    steps: [],
    startedAt: null,
    completedAt: null,
    createdAt: n.scheduledAt,
    updatedAt: n.scheduledAt,
  }))
  const remindersLoading = isLoading
  const remindersError = notifError
  const remindersEnabled = true
  const dismissReminder = useCallback(async (id: string) => {
    setDismissingId(id)
    try {
      await dismiss(id)
      await markAsRead(id)
    } finally {
      setDismissingId(null)
    }
  }, [dismiss, markAsRead])
  const router = useRouter()

  const isComplete = interfaceMode === 'complete'
  const hasActivities = nextActivity !== null || todayActivities.length > 0 || inProgressActivities.length > 0

  if (loading) {
    return (
      <DashboardLayout>
        <LiveRegion message="Carregando suas atividades." />
        <DashboardSkeleton />
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState message={error} onRetry={retry} />
      </DashboardLayout>
    )
  }

  const maxInProgress = isComplete ? inProgressActivities.length : Math.min(inProgressActivities.length, 1)

  return (
    <DashboardLayout>
      <LiveRegion message="Dashboard carregado" />

      <div className="flex flex-col gap-8">
        <WelcomeSection name={profile?.name || user?.displayName || null} />

        <NextActivityCard
          activity={nextActivity}
          onViewActivity={() => nextActivity && router.push(
            nextActivity.status === 'inProgress'
              ? `/atividades?modal=executar&id=${nextActivity.id}`
              : `/atividades?modal=detalhes&id=${nextActivity.id}`
          )}
          onAddActivity={() => router.push('/atividades?modal=nova')}
        />

        <TodayActivitiesSection
          activities={todayActivities}
          onViewActivity={(id) => router.push(`/atividades?modal=detalhes&id=${id}`)}
          onAddActivity={() => router.push('/atividades?modal=nova')}
        />

        <QuickActions onAddActivity={() => router.push('/atividades?modal=nova')} />

        {inProgressActivities.length > 0 && (
          <ContinueActivitySection
            activities={inProgressActivities.slice(0, maxInProgress)}
            maxItems={maxInProgress}
            onContinue={(id) => router.push(`/atividades?modal=executar&id=${id}`)}
          />
        )}

        {isComplete && weeklySummary && <WeeklyProgressCard summary={weeklySummary} />}

        {remindersEnabled && (
          <ReminderList
            reminders={dueReminders}
            loading={remindersLoading}
            error={remindersError}
            dismissingId={dismissingId}
            onView={(id) => router.push(`/atividades?modal=detalhes&id=${id}&from=dashboard`)}
            onContinue={(id) => router.push(`/atividades?modal=executar&id=${id}&from=dashboard`)}
            onDismiss={dismissReminder}
            maxItems={isComplete ? 5 : 3}
          />
        )}

        {isComplete && <RecentHistory activities={recentCompleted} />}

        <HelpCard hasActivities={hasActivities} />
      </div>
    </DashboardLayout>
  )
}

export function DashboardContent() {
  return (
    <AuthGuard>
      <DashboardInner />
    </AuthGuard>
  )
}
