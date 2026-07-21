import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ActivitiesSkeleton } from '@/modules/activities/presentation/components/ActivitiesSkeleton'
import { AtividadesListWrapper } from './atividades-list-wrapper'
import { AtividadesSecondaryNav } from './atividades-secondary-nav'

export const metadata: Metadata = {
  title: 'Minhas atividades | SeniorEase',
  description: 'Gerencie suas atividades no SeniorEase.',
}

export default function AtividadesPage() {
  return (
    <DashboardPagesLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-text">Minhas atividades</h1>
        <p className="text-sm text-text-muted">
          Acompanhe suas tarefas, compromissos e atividades.
        </p>
      </div>
      <AtividadesSecondaryNav />
      <Suspense fallback={<ActivitiesSkeleton />}>
        <AtividadesListWrapper />
      </Suspense>
    </DashboardPagesLayout>
  )
}
