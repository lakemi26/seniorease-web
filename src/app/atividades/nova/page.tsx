import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../../dashboard-pages-layout'
import { NovaAtividadeFormWrapper } from './nova-atividade-form-wrapper'

export const metadata: Metadata = {
  title: 'Nova atividade | SeniorEase',
  description: 'Crie uma nova atividade no SeniorEase.',
}

export default function NovaAtividadePage() {
  return (
    <DashboardPagesLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-text mb-2">Nova atividade</h1>
        <p className="text-sm text-text-muted mb-8">
          Adicione as informações principais e, se desejar, divida a atividade em etapas.
        </p>
        <NovaAtividadeFormWrapper />
      </div>
    </DashboardPagesLayout>
  )
}
