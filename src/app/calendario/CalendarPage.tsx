'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { useCalendarActivities } from '@/modules/activities/presentation/hooks/useCalendarActivities'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { CalendarHeader } from '@/modules/activities/presentation/components/calendar/CalendarHeader'
import { CalendarViewSwitcher } from '@/modules/activities/presentation/components/calendar/CalendarViewSwitcher'
import { CalendarMonthGrid } from '@/modules/activities/presentation/components/calendar/CalendarMonthGrid'
import { CalendarDayAgenda } from '@/modules/activities/presentation/components/calendar/CalendarDayAgenda'
import { ActivityAgenda } from '@/modules/activities/presentation/components/calendar/ActivityAgenda'
import { CalendarEmptyState } from '@/modules/activities/presentation/components/calendar/CalendarEmptyState'
import { CalendarSkeleton } from '@/modules/activities/presentation/components/calendar/CalendarSkeleton'
import { ErrorState } from '@/modules/dashboard/presentation/components/ErrorState'
import { isSameDay, startOfMonth } from '@/modules/activities/presentation/utils/date.utils'

export function CalendarPage() {
  const { user } = useAuth()
  const { interface: interfaceMode } = useAccessibility()
  const isComplete = interfaceMode === 'complete'
  const router = useRouter()

  const {
    activities,
    loading,
    error,
    currentMonth,
    monthLabel,
    view,
    selectedDate,
    changingMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    changeView,
  } = useCalendarActivities()

  const handleViewDetails = (id: string) => {
    router.push(`/atividades?modal=detalhes&id=${id}&from=calendar`)
  }

  const selectedDateActivities = selectedDate
    ? activities.filter((a) => isSameDay(a.scheduledAt, selectedDate))
    : []

  const filteredActivities = selectedDate ? selectedDateActivities : activities

  if (loading && !changingMonth) {
    return <CalendarSkeleton />
  }

  if (error) {
    return (
      <ErrorState
        message="Não foi possível carregar as atividades do calendário."
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <>
      <LiveRegion
        message={changingMonth ? `Mês de ${monthLabel}` : 'Calendário carregado'}
        priority="polite"
      />

      <div className="flex flex-col gap-6">
        <CalendarHeader
          monthLabel={monthLabel}
          onPrevious={goToPreviousMonth}
          onNext={goToNextMonth}
          onToday={goToToday}
        />

        {isComplete && (
          <CalendarViewSwitcher view={view} onChange={changeView} />
        )}

        {view === 'month' && isComplete && (
          <CalendarMonthGrid
            year={currentMonth.getFullYear()}
            month={currentMonth.getMonth()}
            activities={activities}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
          />
        )}

        {selectedDate && view === 'month' && selectedDateActivities.length > 0 && (
          <CalendarDayAgenda
            date={selectedDate}
            activities={selectedDateActivities}
            onViewDetails={handleViewDetails}
          />
        )}

        {(view === 'agenda' || !isComplete) && (
          activities.length === 0 && !loading ? (
            <CalendarEmptyState variant="month" />
          ) : (
            <ActivityAgenda
              activities={activities}
              onViewDetails={handleViewDetails}
            />
          )
        )}

        {activities.length === 0 && !loading && view === 'month' && (
          <CalendarEmptyState variant="month" />
        )}
      </div>
    </>
  )
}
