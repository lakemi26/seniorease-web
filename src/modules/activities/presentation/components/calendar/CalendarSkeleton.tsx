export function CalendarSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 bg-border rounded" />
        <div className="h-8 w-20 bg-border rounded" />
      </div>
      <div className="flex gap-1">
        <div className="h-8 w-20 bg-border rounded" />
        <div className="h-8 w-20 bg-border rounded" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-md border border-border">
            <div className="h-4 w-12 bg-border rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-border rounded" />
              <div className="h-3 w-24 bg-border rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
