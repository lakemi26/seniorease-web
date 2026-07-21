import type { Meta, StoryObj } from '@storybook/react'
import { ContrastOptions } from '@/modules/personalization/presentation/components/ContrastOptions'
import { useState } from 'react'

const meta: Meta<typeof ContrastOptions> = {
  title: 'Personalização/ContrastOptions',
  component: ContrastOptions,
  parameters: {
    docs: {
      description: {
        component:
          'Opções de contraste da tela: Padrão, Alto contraste e Escuro. Utiliza RadioCardGroup com preview visual de cada tema.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ContrastOptions>

function Wrapper() {
  const [value, setValue] = useState<'default' | 'high' | 'dark'>('default')
  return <ContrastOptions value={value} onChange={setValue} />
}

export const Interativo: Story = {
  render: () => <Wrapper />,
}
