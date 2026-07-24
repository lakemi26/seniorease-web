import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { NotificationsSkeleton } from '@/notifications/presentation/components/NotificationsSkeleton'
import { NotificationsPageContentWrapper } from './wrapper'

export const metadata: Metadata = {
  title: 'Notificações | SeniorEase',
  description: 'Acompanhe seus lembretes e atividades próximas no SeniorEase.',
}

export default function NotificacoesPage() {
  return (
    <DashboardPagesLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-text">Notificações</h1>
        <p className="text-sm text-text-muted">
          Acompanhe seus lembretes e atividades próximas.
        </p>
      </div>
      <Suspense fallback={<NotificationsSkeleton />}>
        <NotificationsPageContentWrapper />
      </Suspense>
    </DashboardPagesLayout>
  )
}
