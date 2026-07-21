'use client'

import { CheckCircle } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import type { Activity } from '../../../domain/entities'
import { getCategoryLabel, formatDate, formatTime } from '../../utils/activity.utils'

interface ActivityCompletionSummaryProps {
  activity: Activity
  onClose: () => void
}

export function ActivityCompletionSummary({ activity, onClose }: ActivityCompletionSummaryProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <CheckCircle className="w-16 h-16 text-success" aria-hidden="true" />
      <div>
        <h3 className="text-xl font-bold text-text">Atividade concluída!</h3>
        <p className="text-sm text-text-muted mt-1">
          Você concluiu todas as etapas com sucesso.
        </p>
      </div>

      <div className="w-full text-left bg-primary-lighter rounded-md p-4 space-y-2">
        <p className="text-sm font-semibold text-text">{activity.title}</p>
        <p className="text-xs text-text-muted">{getCategoryLabel(activity.category)}</p>
        <p className="text-xs text-text-muted">
          {formatDate(activity.scheduledAt)}
          {activity.hasTime && <> às {formatTime(activity.scheduledAt)}</>}
        </p>
      </div>

      <Button variant="primary" size="large" onClick={onClose}>
        Ver detalhes da atividade
      </Button>
    </div>
  )
}
