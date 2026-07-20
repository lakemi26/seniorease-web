import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@/presentation/components/ui/Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Card é um contêiner reutilizável para agrupar conteúdo. Use variantes default, elevated e outlined conforme o contexto. Não use para ações isoladas - prefira Button.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined'],
      description: 'Estilo visual do card',
    },
    padding: {
      control: 'select',
      options: ['normal', 'compact', 'none'],
      description: 'Espaçamento interno',
    },
    children: { control: 'text' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'Conteúdo do card com sombra padrão.',
    padding: 'normal',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Card com sombra elevada para destaque.',
    padding: 'normal',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Card com borda visível.',
    padding: 'normal',
  },
}

export const WithContent: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-text">Consulta médica</h3>
        <p className="text-text-secondary">Hoje, às 15h</p>
      </div>
    ),
  },
}

export const Compact: Story = {
  args: {
    padding: 'compact',
    children: 'Card com espaçamento compacto.',
  },
}
