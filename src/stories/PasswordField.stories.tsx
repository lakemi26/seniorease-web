import type { Meta, StoryObj } from '@storybook/react'
import { PasswordField } from '@/presentation/components/forms/PasswordField'

const meta: Meta<typeof PasswordField> = {
  title: 'Formulários/PasswordField',
  component: PasswordField,
  parameters: {
    docs: {
      description: {
        component:
          'Campo de senha com botão para alternar entre mostrar e ocultar o texto. Inclui suporte a acessibilidade com aria-label, aria-pressed e focus visível.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof PasswordField>

export const Padrao: Story = {
  args: {
    placeholder: 'Digite sua senha',
  },
}

export const ComErro: Story = {
  args: {
    placeholder: 'Digite sua senha',
    hasError: true,
  },
}

export const Desabilitado: Story = {
  args: {
    placeholder: 'Digite sua senha',
    disabled: true,
  },
}

export const Preenchido: Story = {
  args: {
    placeholder: 'Digite sua senha',
    value: 'minhasenha123',
  },
}
