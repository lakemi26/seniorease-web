import type { Meta, StoryObj } from '@storybook/react'
import { PersonalizationShortcut } from '@/modules/authentication/presentation/components/PersonalizationShortcut'

const meta: Meta<typeof PersonalizationShortcut> = {
  title: 'Profile/PersonalizationShortcut',
  component: PersonalizationShortcut,
}

export default meta
type Story = StoryObj<typeof PersonalizationShortcut>

export const Default: Story = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
