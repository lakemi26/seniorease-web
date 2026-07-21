import type { Meta, StoryObj } from '@storybook/react'
import { ActivitiesSkeleton } from '@/modules/activities/presentation/components/ActivitiesSkeleton'

const meta = {
  title: 'Atividades/ActivitiesSkeleton',
  component: ActivitiesSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivitiesSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export Padrao: Story = {}
