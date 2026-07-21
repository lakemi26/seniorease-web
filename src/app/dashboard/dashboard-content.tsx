'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { useDashboard } from '@/modules/dashboard/presentation/hooks/useDashboard'
import { DashboardLayout } from '@/modules/dashboard/presentation/components/DashboardLayout'
import { DashboardSkeleton } from '@/modules/dashboard/presentation/components/DashboardSkeleton'
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
import { CreateActivityModal } from '@/modules/activities/presentation/components/CreateActivityModal'

function DashboardInner() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { user, profile } = useAuth()
  const { interface: interfaceMode } = useAccessibility()
  const {
    nextActivity,
    todayActivities,
    inProgressActivities,
    recentCompleted,
    weeklySummary,
    remindersEnabled,
    loading,
    error,
    retry,
  } = useDashboard()
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
          onViewActivity={() => nextActivity && router.push(`/atividades?id=${nextActivity.id}`)}
          onAddActivity={() => setIsCreateModalOpen(true)}
        />

        <TodayActivitiesSection
          activities={todayActivities}
          onViewActivity={(id) => router.push(`/atividades?id=${id}`)}
          onAddActivity={() => setIsCreateModalOpen(true)}
        />

        <QuickActions onAddActivity={() => setIsCreateModalOpen(true)} />

        {inProgressActivities.length > 0 && (
          <ContinueActivitySection
            activities={inProgressActivities.slice(0, maxInProgress)}
            maxItems={maxInProgress}
            onContinue={(id) => router.push(`/atividades?id=${id}`)}
          />
        )}

        {isComplete && weeklySummary && <WeeklyProgressCard summary={weeklySummary} />}

        {isComplete && remindersEnabled && (
          <ReminderList
            activities={todayActivities.filter((a) => a.status !== 'completed')}
            onViewActivity={(id) => router.push(`/atividades?id=${id}`)}
          />
        )}

        {isComplete && <RecentHistory activities={recentCompleted} />}

        <HelpCard hasActivities={hasActivities} />
      </div>

      <CreateActivityModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
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
