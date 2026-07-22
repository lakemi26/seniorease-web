import type { Meta, StoryObj } from '@storybook/react'
import { HelpFaqSection } from '@/modules/help/presentation/components/HelpFaqSection'

const meta = {
  title: 'Ajuda/HelpFaqSection',
  component: HelpFaqSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpFaqSection>

export default meta
type Story = StoryObj<typeof meta>

export const PerguntasFrequentes: Story = {
  args: {
    items: [
      { question: 'Como crio uma atividade?', answer: 'Acesse "Atividades" no menu e selecione "Nova atividade".' },
      { question: 'Posso dividir uma atividade em etapas?', answer: 'Sim. Ao criar ou editar uma atividade, você pode adicionar etapas.' },
      { question: 'Como continuo uma atividade que comecei?', answer: 'No dashboard, localize a atividade em andamento e selecione "Continuar".' },
      { question: 'Como aumento o tamanho dos textos?', answer: 'Acesse "Configurações" no menu, localize "Tamanho da fonte".' },
    ],
  },
}
