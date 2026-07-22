import type { Meta, StoryObj } from '@storybook/react'
import { ContextualHelpLink } from '@/modules/help/presentation/components/ContextualHelpLink'

const meta = {
  title: 'Ajuda/ContextualHelpLink',
  component: ContextualHelpLink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextualHelpLink>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {
  args: {},
}

export const ComArtigo: Story = {
  args: {
    articleSlug: 'criar-atividade',
    origin: 'atividades',
  },
}

export const ComLabelPersonalizado: Story = {
  args: {
    label: 'Ver orientação',
  },
}
