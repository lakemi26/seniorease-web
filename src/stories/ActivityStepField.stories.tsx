import type { Meta, StoryObj } from '@storybook/react'
import { ActivityStepField } from '@/modules/activities/presentation/components/ActivityStepField'

const meta = {
  title: 'Atividades/ActivityStepField',
  component: ActivityStepField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityStepField>

export default meta
type Story = StoryObj<typeof meta>

export const Primeira: Story = {
  args: {
    index: 0,
    total: 3,
    value: 'Separar documentos',
    onChange: () => {},
    onRemove: () => {},
    onMoveUp: () => {},
    onMoveDown: () => {},
  },
}

export const Intermediaria: Story = {
  args: {
    index: 1,
    total: 3,
    value: 'Confirmar horário',
    onChange: () => {},
    onRemove: () => {},
    onMoveUp: () => {},
    onMoveDown: () => {},
  },
}

export const Ultima: Story = {
  args: {
    index: 2,
    total: 3,
    value: 'Ir ao hospital',
    onChange: () => {},
    onRemove: () => {},
    onMoveUp: () => {},
    onMoveDown: () => {},
  },
}
