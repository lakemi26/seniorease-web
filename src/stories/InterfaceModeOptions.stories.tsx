import type { Meta, StoryObj } from '@storybook/react'
import { InterfaceModeOptions } from '@/modules/personalization/presentation/components/InterfaceModeOptions'
import { useState } from 'react'

const meta: Meta<typeof InterfaceModeOptions> = {
  title: 'Personalização/InterfaceModeOptions',
  component: InterfaceModeOptions,
  parameters: {
    docs: {
      description: {
        component:
          'Opções de quantidade de informações: Modo básico e Modo completo. Utiliza RadioCardGroup com preview visual de cada modo.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InterfaceModeOptions>

function Wrapper() {
  const [value, setValue] = useState<'basic' | 'complete'>('complete')
  return <InterfaceModeOptions value={value} onChange={setValue} />
}

export const Interativo: Story = {
  render: () => <Wrapper />,
}
