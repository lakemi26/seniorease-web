'use client'

import { Button } from '@/presentation/components/ui/Button'

interface ReopenStepConfirmationProps {
  stepTitle: string
  onConfirm: () => void
  onCancel: () => void
  saving: boolean
}

export function ReopenStepConfirmation({ stepTitle, onConfirm, onCancel, saving }: ReopenStepConfirmationProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary">
        Reabrir a etapa "{stepTitle}"? Ela voltará a ficar pendente.
      </p>
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm} loading={saving}>
          Reabrir etapa
        </Button>
      </div>
    </div>
  )
}
