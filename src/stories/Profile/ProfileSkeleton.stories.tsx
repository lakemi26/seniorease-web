import type { Meta, StoryObj } from '@storybook/react'
import { ProfileSkeleton } from '@/modules/authentication/presentation/components/ProfileSkeleton'

const meta: Meta<typeof ProfileSkeleton> = {
  title: 'Profile/ProfileSkeleton',
  component: ProfileSkeleton,
}

export default meta
type Story = StoryObj<typeof ProfileSkeleton>

export const Default: Story = {
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
