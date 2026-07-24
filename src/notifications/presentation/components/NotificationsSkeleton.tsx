export function NotificationsSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Carregando suas notificações.">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse p-4 rounded-md border border-border">
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full bg-border" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-border" />
              <div className="h-3 w-full rounded bg-border" />
              <div className="h-3 w-1/4 rounded bg-border" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
