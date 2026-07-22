import type { Meta, StoryObj } from '@storybook/react'
import { HelpArticleNotFound } from '@/modules/help/presentation/components/HelpArticleNotFound'

const meta = {
  title: 'Ajuda/HelpArticleNotFound',
  component: HelpArticleNotFound,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpArticleNotFound>

export default meta
type Story = StoryObj<typeof meta>

export const ArtigoNaoEncontrado: Story = {
  args: {
    onGoBack: () => {},
    onSearch: () => {},
  },
}
