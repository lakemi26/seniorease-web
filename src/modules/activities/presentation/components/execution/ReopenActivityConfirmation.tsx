'use client'

import { Button } from '@/presentation/components/ui/Button'

interface ReopenActivityConfirmationProps {
  activityTitle: string
  onConfirm: () => void
  onCancel: () => void
  saving: boolean
}

export function ReopenActivityConfirmation({ activityTitle, onConfirm, onCancel, saving }: ReopenActivityConfirmationProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-text">Reabrir atividade</h3>
        <p className="text-sm text-text-muted">
          Reabrir "{activityTitle}"? A atividade voltará a ficar em andamento e você
          poderá continuar de onde parou.
        </p>
      </div>
      <div className="flex flex-col gap-3 pt-4 border-t border-border">
        <Button variant="primary" size="large" onClick={onConfirm} loading={saving}>
          Sim, reabrir atividade
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
