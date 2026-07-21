import { ActivitiesSkeleton } from '@/modules/activities/presentation/components/ActivitiesSkeleton'

export default function AtividadesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-2 mb-8">
          <div className="h-8 w-48 bg-border/50 rounded animate-pulse" />
          <div className="h-4 w-72 bg-border/50 rounded animate-pulse" />
        </div>
        <ActivitiesSkeleton />
      </div>
    </div>
  )
}
