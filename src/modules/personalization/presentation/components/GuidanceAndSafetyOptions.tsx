'use client'

import { SwitchField } from '@/presentation/components/ui/SwitchField'

interface GuidanceAndSafetyOptionsProps {
  enhancedFeedback: boolean
  confirmCriticalActions: boolean
  reduceMotion: boolean
  onChange: (key: 'enhancedFeedback' | 'confirmCriticalActions' | 'reduceMotion', value: boolean) => void
}

export function GuidanceAndSafetyOptions({
  enhancedFeedback,
  confirmCriticalActions,
  reduceMotion,
  onChange,
}: GuidanceAndSafetyOptionsProps) {
  return (
    <section>
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-text">Orientação e segurança</h2>
      </div>
      <div className="divide-y divide-border">
        <SwitchField
          id="enhancedFeedback"
          label="Feedback reforçado"
          description="Destaca mensagens após salvar, concluir ou alterar uma informação."
          checked={enhancedFeedback}
          onChange={(v) => onChange('enhancedFeedback', v)}
        />
        <SwitchField
          id="confirmCriticalActions"
          label="Confirmação de ações importantes"
          description="Pede confirmação antes de excluir ou concluir informações importantes."
          checked={confirmCriticalActions}
          onChange={(v) => onChange('confirmCriticalActions', v)}
        />
        <SwitchField
          id="reduceMotion"
          label="Reduzir animações"
          description="Diminui movimentos e transições na tela."
          checked={reduceMotion}
          onChange={(v) => onChange('reduceMotion', v)}
        />
      </div>
    </section>
  )
}
