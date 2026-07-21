import type { Meta, StoryObj } from '@storybook/react'
import { CategorySelect } from '@/modules/activities/presentation/components/CategorySelect'

const meta = {
  title: 'Atividades/CategorySelect',
  component: CategorySelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CategorySelect>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
}

export const ComSelecao: Story = {
  args: {
    value: 'health',
    onChange: () => {},
  },
}

export const ComErro: Story = {
  args: {
    value: undefined,
    onChange: () => {},
    error: 'Selecione uma categoria.',
  },
}
