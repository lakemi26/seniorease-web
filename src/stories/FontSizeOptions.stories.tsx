import type { Meta, StoryObj } from '@storybook/react'
import { FontSizeOptions } from '@/modules/personalization/presentation/components/FontSizeOptions'
import { useState } from 'react'

const meta: Meta<typeof FontSizeOptions> = {
  title: 'Personalização/FontSizeOptions',
  component: FontSizeOptions,
  parameters: {
    docs: {
      description: {
        component:
          'Opções de tamanho dos textos: Normal, Grande e Muito grande. Utiliza RadioCardGroup para seleção visual.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof FontSizeOptions>

function Wrapper() {
  const [value, setValue] = useState<'normal' | 'large' | 'extraLarge'>('normal')
  return <FontSizeOptions value={value} onChange={setValue} />
}

export const Interativo: Story = {
  render: () => <Wrapper />,
}
