export function ReminderSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-md border border-border">
          <div className="w-2 h-2 rounded-full bg-border mt-2" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-border rounded" />
            <div className="h-3 w-24 bg-border rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
