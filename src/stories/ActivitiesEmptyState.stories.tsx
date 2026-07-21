import type { Meta, StoryObj } from '@storybook/react'
import { ActivitiesEmptyState } from '@/modules/activities/presentation/components/ActivitiesEmptyState'

const meta = {
  title: 'Atividades/ActivitiesEmptyState',
  component: ActivitiesEmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivitiesEmptyState>

export default meta
type Story = StoryObj<typeof meta>

export ListaVazia: Story = {
  args: { variant: 'empty' },
}

export FiltroSemResultado: Story = {
  args: { variant: 'filter-empty' },
}
