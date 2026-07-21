import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ComingSoonContent } from '@/presentation/components/ui/ComingSoonContent'

export const metadata: Metadata = {
  title: 'Histórico | SeniorEase',
  description: 'Consulte suas atividades concluídas no SeniorEase.',
}

export default function HistoricoPage() {
  return (
    <DashboardPagesLayout>
      <ComingSoonContent
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
          </svg>
        }
        title="Histórico"
        description="Esta funcionalidade está sendo preparada e será disponibilizada na próxima etapa do projeto."
      />
    </DashboardPagesLayout>
  )
}
