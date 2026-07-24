'use client'

import { Button } from '@/presentation/components/ui/Button'

interface ActivityCompletionConfirmationProps {
  activityTitle: string
  completedSteps: number
  totalSteps: number
  onConfirm: () => void
  onBack: () => void
  saving: boolean
}

export function ActivityCompletionConfirmation({
  activityTitle,
  completedSteps,
  totalSteps,
  onConfirm,
  onBack,
  saving,
}: ActivityCompletionConfirmationProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-lg font-semibold text-text">Concluir atividade?</h3>
        <p className="text-sm text-text-muted">
          Você concluiu {completedSteps} de {totalSteps} etapas de &quot;{activityTitle}&quot;.
        </p>
        <p className="text-sm text-text-muted">
          Após concluir, você não poderá mais editar as etapas sem reabrir a atividade.
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-border">
        <Button variant="primary" size="large" onClick={onConfirm} loading={saving}>
          Sim, concluir atividade
        </Button>
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
      </div>
    </div>
  )
}
