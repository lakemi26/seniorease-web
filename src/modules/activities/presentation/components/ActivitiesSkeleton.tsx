export function ActivitiesSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-20 rounded-md bg-border/50 animate-pulse"
        />
      ))}
    </div>
  )
}
