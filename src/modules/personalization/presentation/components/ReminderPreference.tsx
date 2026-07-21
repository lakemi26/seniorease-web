'use client'

import { SwitchField } from '@/presentation/components/ui/SwitchField'
import { Card } from '@/presentation/components/ui/Card'

interface ReminderPreferenceProps {
  remindersEnabled: boolean
  onChange: (value: boolean) => void
}

export function ReminderPreference({ remindersEnabled, onChange }: ReminderPreferenceProps) {
  return (
    <Card as="section" aria-label="Lembretes">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-text">Lembretes</h2>
        <p className="text-sm text-text-muted mb-1">
          Controla a exibição de lembretes de atividades no painel. Esta configuração
          não remove os lembretes das atividades, apenas controla a exibição geral.
        </p>
      </div>
      <div className="border-t border-border">
        <SwitchField
          id="remindersEnabled"
          label="Mostrar lembretes de atividades"
          description="Exibe avisos sobre atividades e compromissos dentro do SeniorEase."
          checked={remindersEnabled}
          onChange={onChange}
        />
      </div>
    </Card>
  )
}
