export function ActivityHistorySkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 p-4 rounded-md border border-border">
          <div className="w-5 h-5 rounded-full bg-border shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-48 bg-border rounded" />
            <div className="h-3 w-32 bg-border rounded" />
            <div className="h-3 w-64 bg-border rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
