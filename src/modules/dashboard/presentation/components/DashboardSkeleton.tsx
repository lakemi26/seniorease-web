'use client'

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse" aria-hidden="true">
      <div className="space-y-4">
        <div className="h-8 w-64 bg-border rounded-md" />
        <div className="h-4 w-96 bg-border rounded-md" />
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="h-4 w-32 bg-border rounded mb-4" />
        <div className="h-6 w-3/4 bg-border rounded mb-2" />
        <div className="h-4 w-1/2 bg-border rounded mb-4" />
        <div className="h-2 w-full bg-border rounded-full mb-2" />
        <div className="h-4 w-24 bg-border rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface rounded-lg border border-border p-4">
            <div className="h-4 w-20 bg-border rounded mb-2" />
            <div className="h-5 w-3/4 bg-border rounded mb-1" />
            <div className="h-3 w-1/2 bg-border rounded" />
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="h-4 w-40 bg-border rounded mb-4" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 bg-border rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}
