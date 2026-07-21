import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'

interface SpacingOptionsProps {
  value: 'normal' | 'expanded'
  onChange: (value: 'normal' | 'expanded') => void
}

const options = [
  {
    value: 'normal' as const,
    label: 'Normal',
    preview: (
      <div className="space-y-1">
        <div className="h-2 w-full bg-border rounded" />
        <div className="h-2 w-3/4 bg-border rounded" />
      </div>
    ),
  },
  {
    value: 'expanded' as const,
    label: 'Ampliado',
    preview: (
      <div className="space-y-3">
        <div className="h-2 w-full bg-border rounded" />
        <div className="h-2 w-3/4 bg-border rounded" />
      </div>
    ),
  },
]

export function SpacingOptions({ value, onChange }: SpacingOptionsProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text">Espaçamento entre elementos</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Um espaçamento maior pode facilitar a leitura e a seleção dos controles.
        </p>
      </div>
      <RadioCardGroup
        name="spacing"
        legend="Espaçamento"
        options={options}
        value={value}
        onChange={onChange}
      />
    </section>
  )
}
