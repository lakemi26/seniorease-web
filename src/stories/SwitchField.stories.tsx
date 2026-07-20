import type { Meta, StoryObj } from '@storybook/react'
import { SwitchField } from '@/presentation/components/forms/SwitchField'
import { useState } from 'react'

const meta: Meta<typeof SwitchField> = {
  title: 'Formulários/SwitchField',
  component: SwitchField,
  parameters: {
    docs: {
      description: {
        component:
          'Switch acessível com label e descrição. Utiliza role="switch" e aria-checked. Funciona por teclado e mantém foco visível.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SwitchField>

function SwitchWrapper(args: { label: string; description: string }) {
  const [checked, setChecked] = useState(false)

  return (
    <SwitchField
      {...args}
      checked={checked}
      onChange={setChecked}
    />
  )
}

export const Padrao: Story = {
  args: {
    label: 'Feedback reforçado',
    description: 'Mostrar mensagens mais visíveis após salvar, concluir ou alterar uma atividade.',
  },
  render: (args) => <SwitchWrapper {...args} />,
}

export const Ativado: Story = {
  args: {
    label: 'Feedback reforçado',
    description: 'Mostrar mensagens mais visíveis após salvar, concluir ou alterar uma atividade.',
    checked: true,
  },
}

export const Desabilitado: Story = {
  args: {
    label: 'Feedback reforçado',
    checked: false,
    disabled: true,
  },
}

export function ComEstadoInicial() {
  const [checked, setChecked] = useState(true)

  return (
    <SwitchField
      label="Lembretes"
      description="Receber lembretes sobre atividades e compromissos."
      checked={checked}
      onChange={setChecked}
    />
  )
}
