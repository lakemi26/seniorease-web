import type { Meta, StoryObj } from '@storybook/react'
import { PersonalizationSkeleton } from '@/modules/personalization/presentation/components/PersonalizationSkeleton'

const meta: Meta<typeof PersonalizationSkeleton> = {
  title: 'Personalização/PersonalizationSkeleton',
  component: PersonalizationSkeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton de carregamento para a página de personalização. Exibe placeholders animados para o título e 5 blocos de opções.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PersonalizationSkeleton>

export const Carregando: Story = {
  args: {},
}
