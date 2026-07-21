import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'

interface InterfaceModeOptionsProps {
  value: 'basic' | 'complete'
  onChange: (value: 'basic' | 'complete') => void
}

const options = [
  {
    value: 'basic' as const,
    label: 'Modo básico',
    description: 'Mostra somente as informações e ações mais importantes.',
    preview: (
      <div className="space-y-1 p-2 rounded bg-background">
        <div className="h-3 w-24 bg-primary rounded" />
        <div className="h-2 w-32 bg-border rounded" />
      </div>
    ),
  },
  {
    value: 'complete' as const,
    label: 'Modo completo',
    description: 'Mostra recursos adicionais, filtros e informações detalhadas.',
    preview: (
      <div className="space-y-2 p-2 rounded bg-background">
        <div className="h-3 w-24 bg-primary rounded" />
        <div className="h-2 w-40 bg-border rounded" />
        <div className="h-2 w-32 bg-border rounded" />
        <div className="flex gap-1">
          <div className="h-2 w-12 bg-border rounded" />
          <div className="h-2 w-12 bg-border rounded" />
        </div>
      </div>
    ),
  },
]

export function InterfaceModeOptions({ value, onChange }: InterfaceModeOptionsProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text">Quantidade de informações</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Escolha entre uma interface mais simples ou com todos os recursos.
        </p>
      </div>
      <RadioCardGroup
        name="interfaceMode"
        legend="Quantidade de informações"
        options={options}
        value={value}
        onChange={onChange}
      />
    </section>
  )
}
