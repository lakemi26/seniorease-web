import type { Meta, StoryObj } from '@storybook/react'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'

const meta: Meta<typeof LoadingButton> = {
  title: 'Feedback/LoadingButton',
  component: LoadingButton,
  parameters: {
    docs: {
      description: {
        component:
          'Botão com estado de carregamento. Durante o carregamento, exibe um spinner e desabilita o clique. Utiliza aria-busy para acessibilidade.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['normal', 'large'],
    },
    loading: { control: 'boolean' },
    loadingText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof LoadingButton>

export const Padrao: Story = {
  args: {
    children: 'Entrar',
    variant: 'primary',
  },
}

export const Carregando: Story = {
  args: {
    children: 'Entrar',
    loading: true,
    loadingText: 'Entrando...',
    variant: 'primary',
  },
}

export const Desabilitado: Story = {
  args: {
    children: 'Entrar',
    disabled: true,
    variant: 'primary',
  },
}

export const Outline: Story = {
  args: {
    children: 'Cancelar',
    variant: 'outline',
  },
}

export const Large: Story = {
  args: {
    children: 'Salvar e continuar',
    size: 'large',
    variant: 'primary',
  },
}
