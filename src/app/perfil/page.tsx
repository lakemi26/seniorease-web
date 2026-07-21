import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { ComingSoonContent } from '@/presentation/components/ui/ComingSoonContent'

export const metadata: Metadata = {
  title: 'Perfil | SeniorEase',
  description: 'Gerencie seu perfil no SeniorEase.',
}

export default function PerfilPage() {
  return (
    <DashboardPagesLayout>
      <ComingSoonContent
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
          </svg>
        }
        title="Perfil"
        description="Esta funcionalidade está sendo preparada e será disponibilizada na próxima etapa do projeto."
      />
    </DashboardPagesLayout>
  )
}
