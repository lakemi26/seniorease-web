import { DashboardSkeleton } from '@/modules/dashboard/presentation/components/DashboardSkeleton'

export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-surface border-b border-border h-16" />
      <main
        id="main-content"
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <p className="sr-only" role="status">Carregando suas atividades.</p>
        <DashboardSkeleton />
      </main>
    </div>
  )
}
