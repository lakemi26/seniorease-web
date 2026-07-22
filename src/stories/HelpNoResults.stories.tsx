import type { Meta, StoryObj } from '@storybook/react'
import { HelpNoResults } from '@/modules/help/presentation/components/HelpNoResults'

const meta = {
  title: 'Ajuda/HelpNoResults',
  component: HelpNoResults,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpNoResults>

export default meta
type Story = StoryObj<typeof meta>

export const BuscaSemResultado: Story = {
  args: {
    query: 'xyz',
    onClearSearch: () => {},
    onViewCategories: () => {},
  },
}
