'use client'

import { ActivityProgress } from '../ActivityProgress'
import { GuidedStepActions } from './GuidedStepActions'
import type { ActivityStep } from '../../../domain/entities'

interface GuidedActivityStepProps {
  step: ActivityStep
  stepNumber: number
  totalSteps: number
  completedStepsCount: number
  isFirst: boolean
  isLast: boolean
  onPrevious: () => void
  onNext: () => void
  onComplete: () => void
  saving: boolean
}

export function GuidedActivityStep({
  step,
  stepNumber,
  totalSteps,
  completedStepsCount,
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onComplete,
  saving,
}: GuidedActivityStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Etapa {stepNumber} de {totalSteps}
        </p>
        <span className="text-xs text-text-muted">
          {completedStepsCount} de {totalSteps} concluídas
        </span>
      </div>

      <ActivityProgress done={completedStepsCount} total={totalSteps} />

      <div className="p-4 rounded-md bg-primary-lighter border border-primary/20">
        <h4 className="text-base font-semibold text-text">{step.title}</h4>
        {step.completed && step.completedAt && (
          <p className="text-xs text-text-muted mt-1">Etapa concluída</p>
        )}
      </div>

      <GuidedStepActions
        isFirst={isFirst}
        isLast={isLast}
        onPrevious={onPrevious}
        onNext={onNext}
        onComplete={onComplete}
        saving={saving}
        completed={step.completed}
      />
    </div>
  )
}
