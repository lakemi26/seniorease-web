'use client'

import { Button } from '@/presentation/components/ui/Button'

interface GuidedStepActionsProps {
  isFirst: boolean
  isLast: boolean
  onPrevious: () => void
  onNext: () => void
  onComplete: () => void
  saving: boolean
  completed: boolean
}

export function GuidedStepActions({
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onComplete,
  saving,
  completed,
}: GuidedStepActionsProps) {
  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-border">
      {!completed ? (
        <Button variant="primary" size="large" onClick={onComplete} loading={saving}>
          {isLast ? 'Concluir etapa final' : 'Concluir esta etapa'}
        </Button>
      ) : (
        <Button variant="primary" size="large" onClick={onNext}>
          {isLast ? 'Ver resumo da atividade' : 'Próxima etapa'}
        </Button>
      )}

      {!isFirst && (
        <Button variant="ghost" onClick={onPrevious}>
          Etapa anterior
        </Button>
      )}
    </div>
  )
}
