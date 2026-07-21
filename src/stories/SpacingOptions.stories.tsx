import type { Meta, StoryObj } from '@storybook/react'
import { SpacingOptions } from '@/modules/personalization/presentation/components/SpacingOptions'
import { useState } from 'react'

const meta: Meta<typeof SpacingOptions> = {
  title: 'Personalização/SpacingOptions',
  component: SpacingOptions,
  parameters: {
    docs: {
      description: {
        component:
          'Opções de espaçamento entre elementos: Normal e Ampliado. Utiliza RadioCardGroup.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SpacingOptions>

function Wrapper() {
  const [value, setValue] = useState<'normal' | 'expanded'>('normal')
  return <SpacingOptions value={value} onChange={setValue} />
}

export const Interativo: Story = {
  render: () => <Wrapper />,
}
