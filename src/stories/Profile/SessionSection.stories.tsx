import type { Meta, StoryObj } from '@storybook/react'
import { SessionSection } from '@/modules/authentication/presentation/components/SessionSection'

const meta: Meta<typeof SessionSection> = {
  title: 'Profile/SessionSection',
  component: SessionSection,
}

export default meta
type Story = StoryObj<typeof SessionSection>

export const Default: Story = {
  args: {
    showSignOutConfirm: false,
    onOpenSignOut: () => {},
    onCloseSignOut: () => {},
    onConfirmSignOut: async () => {},
  },
}

export const ConfirmationOpen: Story = {
  args: {
    showSignOutConfirm: true,
    onOpenSignOut: () => {},
    onCloseSignOut: () => {},
    onConfirmSignOut: async () => {},
  },
}

export const Mobile: Story = {
  args: { ...Default.args },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
