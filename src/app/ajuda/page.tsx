import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ComingSoonContent } from '@/presentation/components/ui/ComingSoonContent'

export const metadata: Metadata = {
  title: 'Ajuda | SeniorEase',
  description: 'Central de ajuda do SeniorEase.',
}

export default function AjudaPage() {
  return (
    <DashboardPagesLayout>
      <ComingSoonContent
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
            <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
          </svg>
        }
        title="Ajuda"
        description="Esta funcionalidade está sendo preparada e será disponibilizada na próxima etapa do projeto."
      />
    </DashboardPagesLayout>
  )
}
