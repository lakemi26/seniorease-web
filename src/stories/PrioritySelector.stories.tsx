import type { Meta, StoryObj } from '@storybook/react'
import { PrioritySelector } from '@/modules/activities/presentation/components/PrioritySelector'

const meta = {
  title: 'Atividades/PrioritySelector',
  component: PrioritySelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PrioritySelector>

export default meta
type Story = StoryObj<typeof meta>

export const Baixa: Story = {
  args: { value: 'low', onChange: () => {} },
}

export const Normal: Story = {
  args: { value: 'medium', onChange: () => {} },
}

export const Alta: Story = {
  args: { value: 'high', onChange: () => {} },
}

export const ComErro: Story = {
  args: { value: 'medium', onChange: () => {}, error: 'Selecione uma prioridade.' },
}
