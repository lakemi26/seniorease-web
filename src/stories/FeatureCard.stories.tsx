import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from '@/presentation/components/ui/FeatureCard'
import { CheckSquare } from 'lucide-react'

const meta: Meta<typeof FeatureCard> = {
  title: 'UI/FeatureCard',
  component: FeatureCard,
  parameters: {
    docs: {
      description: {
        component:
          'Card de funcionalidade, utilizado para apresentar recursos na landing page. Contém ícone, título e descrição. Use quando precisar listar benefícios ou diferenciais.',
      },
    },
  },
  argTypes: {
    icon: { table: { disable: true } },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Default: Story = {
  args: {
    icon: <CheckSquare className="w-6 h-6" />,
    title: 'Organize suas atividades',
    description: 'Veja tarefas, compromissos e lembretes de forma clara e organizada.',
  },
}

export const SecondCard: Story = {
  args: {
    icon: <CheckSquare className="w-6 h-6" />,
    title: 'Siga cada etapa',
    description: 'Atividades complexas podem ser divididas em passos simples e fáceis de acompanhar.',
  },
}
