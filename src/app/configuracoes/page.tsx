import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ComingSoonContent } from '@/presentation/components/ui/ComingSoonContent'

export const metadata: Metadata = {
  title: 'Configurações | SeniorEase',
  description: 'Ajuste suas preferências no SeniorEase.',
}

export default function ConfiguracoesPage() {
  return (
    <DashboardPagesLayout>
      <ComingSoonContent
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
          </svg>
        }
        title="Configurações"
        description="Esta funcionalidade está sendo preparada e será disponibilizada na próxima etapa do projeto."
      />
    </DashboardPagesLayout>
  )
}
