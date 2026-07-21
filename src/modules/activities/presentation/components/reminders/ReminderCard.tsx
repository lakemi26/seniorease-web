'use client'

import { Button } from '@/presentation/components/ui/Button'
import { Bell, BellOff } from 'lucide-react'
import type { Activity } from '../../../domain/entities'
import { formatTime } from '../../utils/date.utils'
import { formatDateShort } from '../../utils/activity.utils'
import { isReminderOverdue } from '../../utils/date.utils'

interface ReminderCardProps {
  activity: Activity
  onView: (id: string) => void
  onContinue?: (id: string) => void
  onDismiss: (id: string) => void
  dismissing: boolean
}

export function ReminderCard({ activity, onView, onContinue, onDismiss, dismissing }: ReminderCardProps) {
  const isOverdue = activity.reminder.remindAt ? isReminderOverdue(activity.reminder.remindAt) : false
  const isInProgress = activity.status === 'inProgress'

  const message = isOverdue
    ? 'O lembrete desta atividade já passou.'
    : isInProgress && activity.reminder.remindAt
      ? `Lembrete: hoje, às ${formatTime(activity.reminder.remindAt)}`
      : activity.reminder.remindAt
        ? `${formatDateShort(activity.reminder.remindAt)}, ${formatTime(activity.reminder.remindAt)}`
        : ''

  return (
    <div className="flex items-start gap-3 p-3 rounded-md border border-border bg-surface hover:bg-primary-lighter transition-colors">
      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{activity.title}</p>
        <p className={`text-xs mt-0.5 ${isOverdue ? 'text-danger' : 'text-accent'}`}>
          {message}
        </p>
      </div>
      <div className="flex flex-col gap-1.5 flex-shrink-0">
        {isInProgress && onContinue && (
          <Button variant="primary" size="normal" onClick={() => onContinue(activity.id)}>
            Continuar
          </Button>
        )}
        <Button
          variant="ghost"
          size="normal"
          onClick={() => onView(activity.id)}
        >
          Detalhes
        </Button>
        <Button
          variant="ghost"
          size="normal"
          onClick={() => onDismiss(activity.id)}
          loading={dismissing}
          disabled={dismissing}
        >
          Dispensar
        </Button>
      </div>
    </div>
  )
}
