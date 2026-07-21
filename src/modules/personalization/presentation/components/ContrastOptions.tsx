import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'

interface ContrastOptionsProps {
  value: 'default' | 'high' | 'dark'
  onChange: (value: 'default' | 'high' | 'dark') => void
}

const options = [
  {
    value: 'default' as const,
    label: 'Padrão',
    description: 'Cores suaves e confortáveis.',
    preview: (
      <div className="flex gap-2 items-center p-2 rounded bg-background border border-border">
        <div className="w-4 h-4 rounded-full bg-primary" />
        <span className="text-xs text-text">Padrão</span>
      </div>
    ),
  },
  {
    value: 'high' as const,
    label: 'Alto contraste',
    description: 'Máxima diferença entre texto e fundo.',
    preview: (
      <div className="flex gap-2 items-center p-2 rounded bg-white border-2 border-black">
        <div className="w-4 h-4 rounded-full bg-[#005A5C]" />
        <span className="text-xs text-black font-bold">Alto</span>
      </div>
    ),
  },
  {
    value: 'dark' as const,
    label: 'Escuro',
    description: 'Fundo escuro para reduzir claridade.',
    preview: (
      <div className="flex gap-2 items-center p-2 rounded bg-[#161B22] border border-[#30363D]">
        <div className="w-4 h-4 rounded-full bg-[#58A6FF]" />
        <span className="text-xs text-[#E6EDF3]">Escuro</span>
      </div>
    ),
  },
]

export function ContrastOptions({ value, onChange }: ContrastOptionsProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text">Contraste da tela</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Escolha a combinação de cores que facilita a visualização.
        </p>
      </div>
      <RadioCardGroup
        name="contrast"
        legend="Contraste da tela"
        options={options}
        value={value}
        onChange={onChange}
      />
    </section>
  )
}
