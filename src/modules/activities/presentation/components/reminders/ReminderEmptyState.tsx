'use client'

import { Bell } from 'lucide-react'

export function ReminderEmptyState() {
  return (
    <div className="flex flex-col items-center text-center py-6 px-4">
      <Bell className="w-8 h-8 text-text-muted mb-2" aria-hidden="true" />
      <p className="text-sm font-medium text-text">Nenhum lembrete próximo.</p>
      <p className="text-xs text-text-muted mt-1">Seus próximos avisos aparecerão aqui.</p>
    </div>
  )
}
