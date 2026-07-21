'use client'

import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { PersonalizationPageContent } from '@/modules/personalization/presentation/components/PersonalizationPageContent'

export default function ConfiguracoesPage() {
  return (
    <DashboardPagesLayout>
      <PersonalizationPageContent />
    </DashboardPagesLayout>
  )
}
