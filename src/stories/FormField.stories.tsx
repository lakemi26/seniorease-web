import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from '@/presentation/components/forms/FormField'

const meta: Meta<typeof FormField> = {
  title: 'Formulários/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'Componente de campo de formulário que envolve um input com label, descrição e mensagem de erro. Utilizado para garantir acessibilidade e consistência visual em todos os formulários.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    description: { control: 'text' },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Padrao: Story = {
  args: {
    label: 'E-mail',
    required: true,
    children: (
      <input
        type="email"
        placeholder="Digite seu e-mail"
        className="w-full px-4 py-2.5 rounded-md border border-border bg-surface text-text text-base"
      />
    ),
  },
}

export const ComDescricao: Story = {
  args: {
    label: 'Senha',
    description: 'Mínimo de 6 caracteres.',
    children: (
      <input
        type="password"
        placeholder="Digite sua senha"
        className="w-full px-4 py-2.5 rounded-md border border-border bg-surface text-text text-base"
      />
    ),
  },
}

export const ComErro: Story = {
  args: {
    label: 'E-mail',
    error: 'Digite um endereço de e-mail válido.',
    required: true,
    children: (
      <input
        type="email"
        placeholder="Digite seu e-mail"
        className="w-full px-4 py-2.5 rounded-md border border-danger bg-surface text-text text-base"
        aria-invalid="true"
      />
    ),
  },
}

export const Desabilitado: Story = {
  args: {
    label: 'E-mail',
    children: (
      <input
        type="email"
        placeholder="Digite seu e-mail"
        disabled
        className="w-full px-4 py-2.5 rounded-md border border-border bg-surface text-text text-base opacity-50 cursor-not-allowed"
      />
    ),
  },
}
