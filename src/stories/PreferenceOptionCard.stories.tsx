import type { Meta, StoryObj } from '@storybook/react'
import { PreferenceOptionCard } from '@/presentation/components/ui/PreferenceOptionCard'

const meta: Meta<typeof PreferenceOptionCard> = {
  title: 'UI/PreferenceOptionCard',
  component: PreferenceOptionCard,
  parameters: {
    docs: {
      description: {
        component:
          'Card selecionável para opções de preferência. Funciona como um radio button visual, com suporte a texto de exemplo. Utiliza role="radio" e aria-checked para acessibilidade.',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean' },
    label: { control: 'text' },
    sampleText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PreferenceOptionCard>

export const NaoSelecionado: Story = {
  args: {
    label: 'Normal',
    selected: false,
    sampleText: 'Acompanhe suas atividades.',
    sampleStyle: { fontSize: '1rem' },
  },
}

export const Selecionado: Story = {
  args: {
    label: 'Grande',
    selected: true,
    sampleText: 'Acompanhe suas atividades.',
    sampleStyle: { fontSize: '1.375rem' },
  },
}

export const MuitoGrande: Story = {
  args: {
    label: 'Muito grande',
    selected: false,
    sampleText: 'Acompanhe suas atividades.',
    sampleStyle: { fontSize: '1.875rem' },
  },
}
