'use client'

import { useOnboarding } from '@/modules/onboarding/presentation/hooks/useOnboarding'
import { Stepper } from '@/presentation/components/ui/Stepper'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { StepWelcome } from './StepWelcome'
import { StepFontSize } from './StepFontSize'
import { StepContrast } from './StepContrast'
import { StepInterfaceMode } from './StepInterfaceMode'
import { StepSecurity } from './StepSecurity'
import { StepReview } from './StepReview'
import { STEP_LABELS } from '@/modules/onboarding/presentation/data/steps'

export function OnboardingContainer() {
  const {
    currentStep,
    totalSteps,
    steps,
    preferences,
    isSaving,
    saveError,
    isCompleted,
    nextStep,
    previousStep,
    goToStep,
    updatePreference,
    completeOnboarding,
    setSaveError,
  } = useOnboarding()

  if (isCompleted) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-text">
          Tudo pronto
        </h2>
        <p className="text-text-secondary text-base max-w-md">
          Sua experiência foi configurada com sucesso.
        </p>
      </div>
    )
  }

  const currentStepData = steps.find(s => s.id === currentStep)

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl mx-auto">
      <LiveRegion
        message={`Etapa ${currentStep} de ${totalSteps}: ${currentStepData?.title || ''}`}
      />

      <div className="mb-8">
        <Stepper
          steps={STEP_LABELS}
          currentStep={currentStep}
        />
      </div>

      <div
        className="mb-2"
        aria-live="polite"
      >
        <p className="text-sm text-text-muted">
          Etapa {currentStep} de {totalSteps}
        </p>
      </div>

      {saveError && (
        <AccessibleAlert
          variant="error"
          message={saveError}
          onClose={() => setSaveError('')}
          className="mb-6"
        />
      )}

      <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
        {currentStep === 1 && (
          <StepWelcome onStart={nextStep} />
        )}
        {currentStep === 2 && (
          <StepFontSize
            value={preferences.fontSize}
            onChange={(v) => updatePreference('fontSize', v)}
          />
        )}
        {currentStep === 3 && (
          <StepContrast
            contrast={preferences.contrast}
            spacing={preferences.spacing}
            onContrastChange={(v) => updatePreference('contrast', v)}
            onSpacingChange={(v) => updatePreference('spacing', v)}
          />
        )}
        {currentStep === 4 && (
          <StepInterfaceMode
            value={preferences.interfaceMode}
            onChange={(v) => updatePreference('interfaceMode', v)}
          />
        )}
        {currentStep === 5 && (
          <StepSecurity
            enhancedFeedback={preferences.enhancedFeedback}
            confirmCriticalActions={preferences.confirmCriticalActions}
            reduceMotion={preferences.reduceMotion}
            remindersEnabled={preferences.remindersEnabled}
            onEnhancedFeedbackChange={(v) => updatePreference('enhancedFeedback', v)}
            onConfirmCriticalActionsChange={(v) => updatePreference('confirmCriticalActions', v)}
            onReduceMotionChange={(v) => updatePreference('reduceMotion', v)}
            onRemindersEnabledChange={(v) => updatePreference('remindersEnabled', v)}
          />
        )}
        {currentStep === 6 && (
          <StepReview
            preferences={preferences}
            onEditStep={(step) => goToStep(step)}
            onComplete={completeOnboarding}
            isSaving={isSaving}
          />
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={previousStep}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-text hover:text-primary rounded-md transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Voltar
              </button>
            )}
          </div>
          <div>
            {currentStep < totalSteps && currentStep > 1 && (
              <LoadingButton
                type="button"
                variant="primary"
                size="large"
                loading={isSaving}
                loadingText="Salvando..."
                onClick={nextStep}
              >
                Continuar
              </LoadingButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
