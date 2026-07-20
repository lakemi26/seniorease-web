import type { Metadata } from 'next'
import { DashboardContent } from './dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard | SeniorEase',
  description: 'Gerencie suas atividades no SeniorEase.',
}

export default function DashboardPage() {
  return <DashboardContent />
}
