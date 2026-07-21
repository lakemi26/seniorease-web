import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { AtividadesListWrapper } from './atividades-list-wrapper'

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
      <AtividadesListWrapper />
    </DashboardPagesLayout>
  )
}
