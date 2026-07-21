import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ComingSoonContent } from '@/presentation/components/ui/ComingSoonContent'

export const metadata: Metadata = {
  title: 'Calendário | SeniorEase',
  description: 'Visualize seu calendário de atividades no SeniorEase.',
}

export default function CalendarioPage() {
  return (
    <DashboardPagesLayout>
      <ComingSoonContent
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
          </svg>
        }
        title="Calendário"
        description="Esta funcionalidade está sendo preparada e será disponibilizada na próxima etapa do projeto."
      />
    </DashboardPagesLayout>
  )
}
