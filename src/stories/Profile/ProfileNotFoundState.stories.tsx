import type { Meta, StoryObj } from '@storybook/react'
import { ProfileNotFoundState } from '@/modules/authentication/presentation/components/ProfileNotFoundState'

const meta: Meta<typeof ProfileNotFoundState> = {
  title: 'Profile/ProfileNotFoundState',
  component: ProfileNotFoundState,
}

export default meta
type Story = StoryObj<typeof ProfileNotFoundState>

export const Default: Story = {
  args: { onRetry: () => {} },
}

export const Mobile: Story = {
  args: { onRetry: () => {} },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
