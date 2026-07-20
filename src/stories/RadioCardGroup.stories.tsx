import type { Meta, StoryObj } from '@storybook/react'
import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'
import { useState } from 'react'

const meta: Meta<typeof RadioCardGroup> = {
  title: 'UI/RadioCardGroup',
  component: RadioCardGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Grupo de opções em formato de cards com radio buttons. Inclui legend, label, descrição e preview. Navegável por teclado e compatível com leitores de tela.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioCardGroup>

function RadioGroupWrapper() {
  const [value, setValue] = useState('default')

  return (
    <RadioCardGroup
      name="contrast"
      legend="Opções de contraste"
      value={value}
      onChange={setValue}
      options={[
        { value: 'default', label: 'Padrão', description: 'Cores suaves e agradáveis' },
        { value: 'high', label: 'Alto contraste', description: 'Maior diferença entre texto e fundo' },
        { value: 'dark', label: 'Escuro', description: 'Fundo escuro para reduzir o cansaço visual' },
      ]}
    />
  )
}

export const Interativo: Story = {
  render: () => <RadioGroupWrapper />,
}
