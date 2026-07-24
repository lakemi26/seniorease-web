import { Bell } from 'lucide-react'

export function NotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Bell className="w-12 h-12 text-text-muted mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-text mb-1">Nenhuma notificação no momento.</h2>
      <p className="text-sm text-text-muted max-w-sm">
        Seus lembretes aparecerão aqui quando chegar o horário.
      </p>
    </div>
  )
}
