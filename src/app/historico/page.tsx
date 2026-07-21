import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ActivityHistorySkeleton } from '@/modules/activities/presentation/components/history/ActivityHistorySkeleton'
import { HistoryPage } from './HistoryPage'

export const metadata: Metadata = {
  title: 'Histórico | SeniorEase',
  description: 'Consulte suas atividades concluídas no SeniorEase.',
}

export default function HistoricoPage() {
  return (
    <DashboardPagesLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-text">Histórico de atividades</h1>
        <p className="text-sm text-text-muted">
          Consulte as atividades que você já concluiu.
        </p>
      </div>
      <Suspense fallback={<ActivityHistorySkeleton />}>
        <HistoryPage />
      </Suspense>
    </DashboardPagesLayout>
  )
}
