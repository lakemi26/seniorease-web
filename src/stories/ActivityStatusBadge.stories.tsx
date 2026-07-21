import type { Meta, StoryObj } from '@storybook/react'
import { ActivityStatusBadge } from '@/modules/activities/presentation/components/ActivityStatusBadge'

const meta = {
  title: 'Atividades/ActivityStatusBadge',
  component: ActivityStatusBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const AFazer: Story = {
  args: { status: 'pending' },
}

export const EmAndamento: Story = {
  args: { status: 'inProgress' },
}

export const Concluida: Story = {
  args: { status: 'completed' },
}

export const Cancelada: Story = {
  args: { status: 'cancelled' },
}

export const Atrasada: Story = {
  args: { status: 'pending', isDelayed: true },
}
