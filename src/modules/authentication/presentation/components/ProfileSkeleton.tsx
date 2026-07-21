'use client'

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse" role="status" aria-live="polite">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-36 bg-border/50 rounded" />
        <div className="h-4 w-64 bg-border/50 rounded" />
      </div>
      <div className="h-48 bg-border/30 rounded-lg" />
      <div className="h-36 bg-border/30 rounded-lg" />
      <div className="h-24 bg-border/30 rounded-lg" />
      <div className="h-24 bg-border/30 rounded-lg" />
      <span className="sr-only">Carregando seu perfil.</span>
    </div>
  )
}
