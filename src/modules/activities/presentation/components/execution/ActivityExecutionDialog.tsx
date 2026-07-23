'use client'

import { useState, useEffect, useCallback } from 'react'
import { HelpCircle, Lightbulb } from 'lucide-react'
import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { ActivityProgress } from '../ActivityProgress'
import { useActivityExecution } from '../../hooks/useActivityExecution'
import { ActivityExecutionIntroduction } from './ActivityExecutionIntroduction'
import { GuidedActivityStep } from './GuidedActivityStep'
import { StepCompletionFeedback } from './StepCompletionFeedback'
import { ActivityCompletionConfirmation } from './ActivityCompletionConfirmation'
import { ActivityWithoutSteps } from './ActivityWithoutSteps'
import { ReopenStepConfirmation } from './ReopenStepConfirmation'
import { ActivityExecutionSkeleton } from './ActivityExecutionSkeleton'
import { ActivityExecutionErrorState } from './ActivityExecutionErrorState'

type ExecutionView =
  | 'introduction'
  | 'step'
  | 'step-feedback'
  | 'completion-confirm'
  | 'completed-summary'
  | 'reopen-step-confirm'

interface ActivityExecutionDialogProps {
  activityId: string | null
  isOpen: boolean
  onClose: () => void
}

export function ActivityExecutionDialog({ activityId, isOpen, onClose }: ActivityExecutionDialogProps) {
  const {
    activity,
    currentStepIndex,
    displayIndex,
    sortedSteps,
    totalSteps,
    completedStepsCount,
    allStepsCompleted,
    loading,
    saving,
    error,
    clearError,
    startActivity,
    completeCurrentStep,
    reopenStep,
    completeActivity,
    reopenActivity,
    setCurrentStepIndex,
  } = useActivityExecution(isOpen ? activityId : null)

  const [view, setView] = useState<ExecutionView>('introduction')
  const [reopenStepId, setReopenStepId] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setView('introduction')
      setReopenStepId(null)
      setShowHelp(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!activity) return

    if (activity.status === 'pending') {
      setView('introduction')
    } else if (activity.status === 'inProgress') {
    if (totalSteps === 0) {
        setView('step')
      } else if (allStepsCompleted) {
        setView('completion-confirm')
      } else {
        setView('step')
      }
    }
  }, [activity, allStepsCompleted, totalSteps])

  const handleStart = useCallback(async () => {
    await startActivity()
    if (totalSteps === 0) {
      setView('step')
    } else {
      setView('step')
    }
  }, [startActivity, totalSteps])

  const handleCompleteStep = useCallback(async () => {
    const ok = await completeCurrentStep()
    if (ok) {
      setView('step-feedback')
    }
  }, [completeCurrentStep])

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
    if (allStepsCompleted) {
      setView('completion-confirm')
    } else {
      setView('step')
    }
  }, [currentStepIndex, totalSteps, allStepsCompleted, setCurrentStepIndex])

  const handlePreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setView('step')
    }
  }, [currentStepIndex, setCurrentStepIndex])

  const handleConfirmCompletion = useCallback(async () => {
    const ok = await completeActivity()
    if (ok) {
      onClose()
    }
  }, [completeActivity, onClose])

  const handleReopenStep = useCallback(async () => {
    if (!reopenStepId) return
    await reopenStep(reopenStepId)
    setReopenStepId(null)
    setView('step')
  }, [reopenStepId, reopenStep])

  const handleClose = useCallback(() => {
    if (saving) return
    clearError()
    onClose()
  }, [saving, clearError, onClose])

  const handleOpenFullHelp = useCallback(() => {
    if (activity) {
      window.open(`/ajuda?artigo=executar-atividade&origem=execucao`, '_blank')
    }
  }, [activity])

  if (!isOpen) return null

  const renderContent = () => {
    if (loading) {
      return <ActivityExecutionSkeleton />
    }

    if (error && !activity) {
      return <ActivityExecutionErrorState message={error} onClose={handleClose} />
    }

    if (!activity) {
      return <ActivityExecutionErrorState message="Atividade não encontrada." onClose={handleClose} />
    }

    if (activity.status === 'cancelled') {
      return <ActivityExecutionErrorState message="Esta atividade foi cancelada." onClose={handleClose} />
    }

    if (showHelp) {
      return (
        <div className="flex flex-col gap-4">
          <div
            role="complementary"
            aria-label="Ajuda contextual"
            className="flex items-start gap-3 p-4 rounded-md bg-accent-light border border-accent/20"
          >
            <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm text-text-secondary mb-3">
                Leia a instrução com calma. Seu progresso está salvo e você poderá continuar depois.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="primary" size="normal" onClick={() => setShowHelp(false)}>
                  Voltar à etapa
                </Button>
                <Button variant="outline" size="normal" onClick={handleOpenFullHelp}>
                  Ver mais orientações
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (view === 'introduction' && activity.status === 'pending') {
      return (
        <ActivityExecutionIntroduction
          activity={activity}
          onStart={handleStart}
          onClose={handleClose}
          saving={saving}
        />
      )
    }

    if (totalSteps === 0) {
      return (
        <div className="flex flex-col gap-4">
          {error && <AccessibleAlert variant="error" message={error} onClose={clearError} />}
          <ActivityWithoutSteps
            activity={activity}
            onStart={handleStart}
            onComplete={handleConfirmCompletion}
            saving={saving}
          />
        </div>
      )
    }

    const currentStep = sortedSteps[currentStepIndex]

    if (view === 'step-feedback' && currentStep) {
      return (
        <div className="flex flex-col gap-4">
          {error && <AccessibleAlert variant="error" message={error} onClose={clearError} />}
          <StepCompletionFeedback
            stepTitle={currentStep.title}
            stepNumber={displayIndex}
            totalSteps={totalSteps}
            onNext={handleNextStep}
            saving={saving}
          />
        </div>
      )
    }

    if (view === 'completion-confirm') {
      return (
        <div className="flex flex-col gap-4">
          {error && <AccessibleAlert variant="error" message={error} onClose={clearError} />}
          <div className="mb-2">
            <ActivityProgress done={completedStepsCount} total={totalSteps} />
          </div>
          <ActivityCompletionConfirmation
            activityTitle={activity.title}
            completedSteps={completedStepsCount}
            totalSteps={totalSteps}
            onConfirm={handleConfirmCompletion}
            onBack={() => setView('step')}
            saving={saving}
          />
        </div>
      )
    }

    if (view === 'reopen-step-confirm' && reopenStepId) {
      const stepToReopen = sortedSteps.find((s) => s.id === reopenStepId)
      return (
        <div className="flex flex-col gap-4">
          <ReopenStepConfirmation
            stepTitle={stepToReopen?.title || ''}
            onConfirm={handleReopenStep}
            onCancel={() => { setReopenStepId(null); setView('step') }}
            saving={saving}
          />
        </div>
      )
    }

    if (view === 'step' && currentStep) {
      return (
        <div className="flex flex-col gap-4">
          {error && <AccessibleAlert variant="error" message={error} onClose={clearError} />}
          <GuidedActivityStep
            step={currentStep}
            stepNumber={displayIndex + 1}
            totalSteps={totalSteps}
            completedStepsCount={completedStepsCount}
            isFirst={currentStepIndex === 0}
            isLast={currentStepIndex === totalSteps - 1}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            onComplete={handleCompleteStep}
            saving={saving}
          />

          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="normal"
              onClick={() => setShowHelp(true)}
              icon={<HelpCircle className="w-4 h-4" aria-hidden="true" />}
              aria-label="Preciso de ajuda com esta etapa"
            >
              Preciso de ajuda
            </Button>
          </div>

          {totalSteps > 1 && (
            <details className="mt-2">
              <summary className="text-xs text-text-muted cursor-pointer hover:text-text select-none">
                Ver todas as etapas
              </summary>
              <ul className="mt-2 space-y-1" role="list">
                {sortedSteps.map((s, i) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      s.completed
                        ? 'bg-success text-white'
                        : i === currentStepIndex
                          ? 'bg-primary text-white'
                          : 'bg-border text-text-muted'
                    }`}>
                      {s.completed ? '✓' : i + 1}
                    </span>
                    <span className={`text-xs ${s.completed ? 'text-text-muted line-through' : i === currentStepIndex ? 'text-text font-medium' : 'text-text-muted'}`}>
                      {s.title}
                    </span>
                    {s.completed && (
                      <button
                        type="button"
                        onClick={() => { setReopenStepId(s.id); setView('reopen-step-confirm') }}
                        className="ml-auto text-xs text-primary hover:underline"
                        aria-label={`Reabrir etapa ${s.title}`}
                      >
                        Reabrir
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )
    }

    return null
  }

  const description = activity?.status === 'pending'
    ? 'Prepare-se para começar esta atividade.'
    : 'Siga as etapas uma de cada vez.'

  return (
    <>
      <LiveRegion
        message={view === 'step' ? `Etapa ${displayIndex + 1} de ${totalSteps}` : ''}
      />
      <Modal isOpen={isOpen} onClose={handleClose} title="Executar atividade" description={description}>
        {renderContent()}
      </Modal>
    </>
  )
}
