export function ActivityExecutionSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-6 w-48 bg-border rounded" />
      <div className="h-4 w-32 bg-border rounded" />
      <div className="h-2 bg-border rounded-full" />
      <div className="space-y-3">
        <div className="h-20 bg-border rounded-md" />
        <div className="h-20 bg-border rounded-md" />
        <div className="h-20 bg-border rounded-md" />
      </div>
      <div className="h-10 w-full bg-border rounded-md" />
    </div>
  )
}
