import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { CalendarSkeleton } from '@/modules/activities/presentation/components/calendar/CalendarSkeleton'
import { CalendarPage } from './CalendarPage'

export const metadata: Metadata = {
  title: 'Calendário | SeniorEase',
  description: 'Visualize seu calendário de atividades no SeniorEase.',
}

export default function CalendarioPage() {
  return (
    <DashboardPagesLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-text">Calendário de atividades</h1>
        <p className="text-sm text-text-muted">
          Veja suas atividades organizadas por data.
        </p>
      </div>
      <Suspense fallback={<CalendarSkeleton />}>
        <CalendarPage />
      </Suspense>
    </DashboardPagesLayout>
  )
}
