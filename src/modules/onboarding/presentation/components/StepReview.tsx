'use client'

import { useEffect, useRef } from 'react'
import { PreferencesSummary } from '@/presentation/components/ui/PreferencesSummary'
import { PreviewPanel } from '@/presentation/components/ui/PreviewPanel'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import type { OnboardingPreferences } from '@/modules/onboarding/domain/entities'

interface StepReviewProps {
  preferences: OnboardingPreferences
  onEditStep: (step: number) => void
  onComplete: () => void
  isSaving: boolean
}

export function StepReview({ preferences, onEditStep, onComplete, isSaving }: StepReviewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h2
        ref={headingRef}
        className="text-2xl font-bold text-text focus-visible:outline-none"
        tabIndex={-1}
      >
        Confira suas escolhas.
      </h2>

      <p className="text-text-secondary text-sm">
        Revise as configurações escolhidas. Você pode voltar e alterar qualquer opção.
      </p>

      <PreferencesSummary
        preferences={preferences}
        onEditStep={onEditStep}
      />

      <div className="pt-2">
        <p className="text-sm font-medium text-text mb-3">Pré-visualização final:</p>
        <PreviewPanel />
      </div>

      <div className="pt-4">
        <LoadingButton
          type="button"
          variant="primary"
          size="large"
          loading={isSaving}
          loadingText="Salvando..."
          onClick={onComplete}
          className="w-full sm:w-auto"
        >
          Salvar e entrar no SeniorEase
        </LoadingButton>
      </div>
    </div>
  )
}
