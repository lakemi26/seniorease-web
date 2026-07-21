interface ActivityProgressProps {
  done: number
  total: number
}

export function ActivityProgress({ done, total }: ActivityProgressProps) {
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-muted shrink-0">
        {done}/{total}
      </span>
      <div
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${done} de ${total} etapas concluídas`}
        className="flex-1 h-1.5 bg-border rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-normal"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
