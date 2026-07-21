export function PersonalizationSkeleton() {
  return (
    <div className="space-y-8 animate-pulse" aria-label="Carregando suas preferências.">
      <div className="space-y-2">
        <div className="h-8 w-72 bg-border rounded" />
        <div className="h-4 w-96 bg-border rounded" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border p-6 space-y-4">
          <div className="h-5 w-48 bg-border rounded" />
          <div className="h-4 w-64 bg-border rounded" />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-24 bg-border rounded-lg" />
            <div className="h-24 bg-border rounded-lg" />
            <div className="h-24 bg-border rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
