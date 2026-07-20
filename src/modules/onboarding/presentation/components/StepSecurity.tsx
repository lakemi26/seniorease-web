'use client'

import { useEffect, useRef } from 'react'
import { SwitchField } from '@/presentation/components/forms/SwitchField'

interface StepSecurityProps {
  enhancedFeedback: boolean
  confirmCriticalActions: boolean
  reduceMotion: boolean
  remindersEnabled: boolean
  onEnhancedFeedbackChange: (value: boolean) => void
  onConfirmCriticalActionsChange: (value: boolean) => void
  onReduceMotionChange: (value: boolean) => void
  onRemindersEnabledChange: (value: boolean) => void
}

export function StepSecurity({
  enhancedFeedback,
  confirmCriticalActions,
  reduceMotion,
  remindersEnabled,
  onEnhancedFeedbackChange,
  onConfirmCriticalActionsChange,
  onReduceMotionChange,
  onRemindersEnabledChange,
}: StepSecurityProps) {
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
        Escolha como o SeniorEase deve orientar você.
      </h2>

      <fieldset className="space-y-4">
        <legend className="sr-only">Configurações de segurança e feedback</legend>

        <SwitchField
          label="Feedback reforçado"
          description="Mostrar mensagens mais visíveis após salvar, concluir ou alterar uma atividade."
          checked={enhancedFeedback}
          onChange={onEnhancedFeedbackChange}
        />

        <SwitchField
          label="Confirmação antes de ações importantes"
          description="Pedir confirmação antes de excluir ou concluir informações importantes."
          checked={confirmCriticalActions}
          onChange={onConfirmCriticalActionsChange}
        />

        <SwitchField
          label="Reduzir animações"
          description="Diminuir movimentos e transições na tela."
          checked={reduceMotion}
          onChange={onReduceMotionChange}
        />

        <SwitchField
          label="Lembretes"
          description="Receber lembretes sobre atividades e compromissos."
          checked={remindersEnabled}
          onChange={onRemindersEnabledChange}
        />
      </fieldset>
    </div>
  )
}
