'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { useCalendarActivities } from '@/modules/activities/presentation/hooks/useCalendarActivities'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { CalendarHeader } from '@/modules/activities/presentation/components/calendar/CalendarHeader'
import { CalendarViewSwitcher } from '@/modules/activities/presentation/components/calendar/CalendarViewSwitcher'
import { CalendarMonthGrid } from '@/modules/activities/presentation/components/calendar/CalendarMonthGrid'
import { CalendarDayAgenda } from '@/modules/activities/presentation/components/calendar/CalendarDayAgenda'
import { CalendarEmptyState } from '@/modules/activities/presentation/components/calendar/CalendarEmptyState'
import { CalendarSkeleton } from '@/modules/activities/presentation/components/calendar/CalendarSkeleton'
import { ActivityModalController } from '@/modules/activities/presentation/components/ActivityModalController'
import { ErrorState } from '@/modules/dashboard/presentation/components/ErrorState'
import { isSameDay, startOfMonth, formatDateFull } from '@/modules/activities/presentation/utils/date.utils'

export function CalendarPage() {
  const { user } = useAuth()
  const { interface: interfaceMode } = useAccessibility()
  const isComplete = interfaceMode === 'complete'
  const router = useRouter()
  const searchParams = useSearchParams()

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
    goToPreviousDay,
    goToNextDay,
    goToToday,
    selectDate,
    changeView,
  } = useCalendarActivities()

  const handleViewDetails = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('modal', 'detalhes')
    params.set('id', id)
    router.replace(`/calendario?${params.toString()}`)
  }

  const selectedDateActivities = selectedDate
    ? activities.filter((a) => isSameDay(a.scheduledAt, selectedDate))
    : []

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
          monthLabel={view === 'agenda' && selectedDate ? formatDateFull(selectedDate) : monthLabel}
          onPrevious={view === 'agenda' ? goToPreviousDay : goToPreviousMonth}
          onNext={view === 'agenda' ? goToNextDay : goToNextMonth}
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

        {(view === 'agenda' || !isComplete) && selectedDate && (
          selectedDateActivities.length > 0 ? (
            <CalendarDayAgenda
              date={selectedDate}
              activities={selectedDateActivities}
              onViewDetails={handleViewDetails}
            />
          ) : !loading ? (
            <CalendarEmptyState variant="day" />
          ) : null
        )}

        {activities.length === 0 && !loading && view === 'month' && (
          <CalendarEmptyState variant="month" />
        )}

        <ActivityModalController />
      </div>
    </>
  )
}
