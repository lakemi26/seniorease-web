'use client'

import { CheckCircle } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'

interface StepCompletionFeedbackProps {
  stepTitle: string
  stepNumber: number
  totalSteps: number
  onNext: () => void
  saving: boolean
}

export function StepCompletionFeedback({
  stepTitle,
  stepNumber,
  totalSteps,
  onNext,
  saving,
}: StepCompletionFeedbackProps) {
  const isLast = stepNumber >= totalSteps

  return (
    <div className="flex flex-col items-center text-center gap-4 py-6">
      <CheckCircle className="w-12 h-12 text-success" aria-hidden="true" />
      <div>
        <h4 className="text-lg font-semibold text-text">Etapa concluída!</h4>
        <p className="text-sm text-text-muted mt-1">
          &quot;{stepTitle}&quot; — Etapa {stepNumber} de {totalSteps}
        </p>
      </div>
      <Button variant="primary" size="large" onClick={onNext} loading={saving}>
        {isLast ? 'Ver resumo da atividade' : 'Próxima etapa'}
      </Button>
    </div>
  )
}
