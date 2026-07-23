'use client'

import { Button } from '@/presentation/components/ui/Button'
import type { Activity } from '../../../domain/entities'

interface ActivityWithoutStepsProps {
  activity: Activity
  onStart: () => void
  onComplete: () => void
  saving: boolean
}

export function ActivityWithoutSteps({ activity, onStart, onComplete, saving }: ActivityWithoutStepsProps) {
  const isPending = activity.status === 'pending'

  return (
    <div className="flex flex-col items-center text-center gap-4 py-6">
      <p className="text-sm text-text-secondary">
        Esta atividade não possui etapas definidas.
      </p>
      <Button
        variant="primary"
        size="large"
        onClick={isPending ? onStart : onComplete}
        loading={saving}
      >
        {isPending ? 'Marcar como concluída' : 'Concluir atividade'}
      </Button>
    </div>
  )
}
