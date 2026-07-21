import { cn } from '@/shared/utils/cn'
import type { OnboardingPreferences } from '@/modules/onboarding/domain/entities'

interface PreferencesSummaryProps {
  preferences: OnboardingPreferences
  onEditStep?: (step: number) => void
  className?: string
}

interface SummaryGroupProps {
  title: string
  step: number
  items: { label: string; value: string }[]
  onEdit?: (step: number) => void
}

function SummaryGroup({ title, step, items, onEdit }: SummaryGroupProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-text">{title}</h3>
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.label} className="text-sm text-text-secondary">
              <span className="font-medium">{item.label}:</span>{' '}
              {item.value}
            </li>
          ))}
        </ul>
      </div>
      {onEdit && (
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-sm text-primary hover:text-primary-dark underline whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm mt-1"
        >
          Alterar
        </button>
      )}
    </div>
  )
}

const fontSizeLabels: Record<string, string> = {
  normal: 'Normal',
  large: 'Grande',
  extraLarge: 'Muito grande',
}

const contrastLabels: Record<string, string> = {
  default: 'Padrão',
  high: 'Alto contraste',
  dark: 'Escuro',
}

const spacingLabels: Record<string, string> = {
  normal: 'Normal',
  expanded: 'Ampliado',
}

const interfaceLabels: Record<string, string> = {
  basic: 'Básico',
  complete: 'Completo',
}

export function PreferencesSummary({
  preferences,
  onEditStep,
  className,
}: PreferencesSummaryProps) {
  return (
    <div className={cn('bg-surface rounded-lg border border-border divide-y divide-border p-4 sm:p-6', className)}>
      <SummaryGroup
        title="Tamanho do texto"
        step={2}
        items={[{ label: 'Tamanho', value: fontSizeLabels[preferences.fontSize] || preferences.fontSize }]}
        onEdit={onEditStep}
      />
      <SummaryGroup
        title="Contraste e espaçamento"
        step={3}
        items={[
          { label: 'Contraste', value: contrastLabels[preferences.contrast] || preferences.contrast },
          { label: 'Espaçamento', value: spacingLabels[preferences.spacing] || preferences.spacing },
        ]}
        onEdit={onEditStep}
      />
      <SummaryGroup
        title="Modo da interface"
        step={4}
        items={[{ label: 'Modo', value: interfaceLabels[preferences.interfaceMode] || preferences.interfaceMode }]}
        onEdit={onEditStep}
      />
      <SummaryGroup
        title="Segurança e feedback"
        step={5}
        items={[
          { label: 'Feedback reforçado', value: preferences.enhancedFeedback ? 'Sim' : 'Não' },
          { label: 'Confirmações', value: preferences.confirmCriticalActions ? 'Sim' : 'Não' },
          { label: 'Reduzir animações', value: preferences.reduceMotion ? 'Sim' : 'Não' },
          { label: 'Lembretes', value: preferences.remindersEnabled ? 'Sim' : 'Não' },
        ]}
        onEdit={onEditStep}
      />
    </div>
  )
}
