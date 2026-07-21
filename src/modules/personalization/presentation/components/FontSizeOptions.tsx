import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'

interface FontSizeOptionsProps {
  value: 'normal' | 'large' | 'extraLarge'
  onChange: (value: 'normal' | 'large' | 'extraLarge') => void
}

const options = [
  {
    value: 'normal' as const,
    label: 'Normal',
    preview: (
      <span className="text-sm text-text-secondary">
        Acompanhe suas atividades.
      </span>
    ),
  },
  {
    value: 'large' as const,
    label: 'Grande',
    preview: (
      <span className="text-lg text-text-secondary">
        Acompanhe suas atividades.
      </span>
    ),
  },
  {
    value: 'extraLarge' as const,
    label: 'Muito grande',
    preview: (
      <span className="text-2xl text-text-secondary">
        Acompanhe suas atividades.
      </span>
    ),
  },
]

export function FontSizeOptions({ value, onChange }: FontSizeOptionsProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text">Tamanho dos textos</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Escolha o tamanho que fica mais confortável para leitura.
        </p>
      </div>
      <RadioCardGroup
        name="fontSize"
        legend="Tamanho dos textos"
        options={options}
        value={value}
        onChange={onChange}
      />
    </section>
  )
}
