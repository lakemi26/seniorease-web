import type { Meta, StoryObj } from '@storybook/react'
import { ProfileErrorState } from '@/modules/authentication/presentation/components/ProfileErrorState'

const meta: Meta<typeof ProfileErrorState> = {
  title: 'Profile/ProfileErrorState',
  component: ProfileErrorState,
}

export default meta
type Story = StoryObj<typeof ProfileErrorState>

export const Default: Story = {
  args: { onRetry: () => {} },
}

export const Mobile: Story = {
  args: { onRetry: () => {} },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
