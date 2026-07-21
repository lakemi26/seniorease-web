import type { Meta, StoryObj } from '@storybook/react'
import { ActivityProgress } from '@/modules/activities/presentation/components/ActivityProgress'

const meta = {
  title: 'Atividades/ActivityProgress',
  component: ActivityProgress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Vazio: Story = {
  args: { done: 0, total: 5 },
}

export const Parcial: Story = {
  args: { done: 3, total: 5 },
}

export const Completo: Story = {
  args: { done: 5, total: 5 },
}

export const EtapaUnica: Story = {
  args: { done: 0, total: 1 },
}

export const MuitasEtapas: Story = {
  args: { done: 7, total: 20 },
}
