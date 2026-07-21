import { ProfileSkeleton } from '@/modules/authentication/presentation/components/ProfileSkeleton'

export default function PerfilLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-2 mb-8">
          <div className="h-8 w-36 bg-border/50 rounded animate-pulse" />
          <div className="h-4 w-64 bg-border/50 rounded animate-pulse" />
        </div>
        <ProfileSkeleton />
      </div>
    </div>
  )
}
