import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from '@/presentation/components/ui/Stepper'

const steps = [
  { id: 1, label: 'Boas-vindas' },
  { id: 2, label: 'Tamanho do texto' },
  { id: 3, label: 'Contraste' },
  { id: 4, label: 'Modo da interface' },
  { id: 5, label: 'Segurança' },
  { id: 6, label: 'Revisão' },
]

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component:
          'Stepper horizontal que indica o progresso em um fluxo de múltiplas etapas. Exibe o número da etapa, o status (completo, atual, pendente) e o rótulo em telas maiores.',
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 6 },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const PrimeiraEtapa: Story = {
  args: {
    steps,
    currentStep: 1,
  },
}

export const EtapaIntermediaria: Story = {
  args: {
    steps,
    currentStep: 3,
  },
}

export const UltimaEtapa: Story = {
  args: {
    steps,
    currentStep: 6,
  },
}
