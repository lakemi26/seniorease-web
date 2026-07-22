import type { Meta, StoryObj } from '@storybook/react'
import { HelpSearch } from '@/modules/help/presentation/components/HelpSearch'

const meta = {
  title: 'Ajuda/HelpSearch',
  component: HelpSearch,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Vazia: Story = {
  args: { value: '', onChange: () => {} },
}

export const ComValor: Story = {
  args: { value: 'atividade', onChange: () => {} },
}

export const ComPlaceholderPersonalizado: Story = {
  args: { value: '', onChange: () => {}, placeholder: 'Digite sua dúvida aqui' },
}
