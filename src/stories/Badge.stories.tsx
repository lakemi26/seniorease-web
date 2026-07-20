import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/presentation/components/ui/Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Badge para rótulos de status ou categorias. Use success para confirmações, info para informações, warning para alertas e neutral para estados padrão.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'neutral'],
      description: 'Variação de cor do badge',
    },
    children: { control: 'text' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Sucesso',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Atenção',
  },
}

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Pendente',
  },
}
