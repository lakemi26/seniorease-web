import type { Meta, StoryObj } from '@storybook/react'
import { StepCard } from '@/presentation/components/ui/StepCard'

const meta: Meta<typeof StepCard> = {
  title: 'UI/StepCard',
  component: StepCard,
  parameters: {
    docs: {
      description: {
        component:
          'Card de etapa numerada usado para mostrar o passo a passo. Ideal para seções "Como funciona". Não use para listas simples - prefira listas HTML.',
      },
    },
  },
  argTypes: {
    stepNumber: { control: { type: 'number', min: 1, max: 9 } },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StepCard>

export const Step1: Story = {
  args: {
    stepNumber: 1,
    title: 'Configure sua experiência',
    description: 'Escolha o tamanho dos textos, o contraste, o espaçamento e o modo de navegação.',
  },
}

export const Step2: Story = {
  args: {
    stepNumber: 2,
    title: 'Adicione suas atividades',
    description: 'Cadastre compromissos, estudos, tarefas profissionais ou assuntos pessoais.',
  },
}

export const Step3: Story = {
  args: {
    stepNumber: 3,
    title: 'Acompanhe passo a passo',
    description: 'Receba lembretes, conclua cada etapa e consulte seu histórico.',
  },
}
