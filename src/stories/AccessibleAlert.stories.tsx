import type { Meta, StoryObj } from '@storybook/react'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'

const meta: Meta<typeof AccessibleAlert> = {
  title: 'Feedback/AccessibleAlert',
  component: AccessibleAlert,
  parameters: {
    docs: {
      description: {
        component:
          'Componente de alerta acessível com role="alert" para ser anunciado por leitores de tela. Suporta variantes de erro, sucesso, informação e aviso.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'success', 'info', 'warning'],
    },
    message: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AccessibleAlert>

export const Erro: Story = {
  args: {
    variant: 'error',
    message: 'Não foi possível entrar. Confira seu e-mail e sua senha.',
  },
}

export const Sucesso: Story = {
  args: {
    variant: 'success',
    message: 'Seu cadastro foi realizado com sucesso.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'Você pode alterar essas configurações a qualquer momento.',
  },
}

export const Aviso: Story = {
  args: {
    variant: 'warning',
    message: 'Sua sessão irá expirar em alguns minutos.',
  },
}

export const ComFechar: Story = {
  args: {
    variant: 'info',
    message: 'Esta mensagem pode ser fechada.',
    onClose: () => {},
  },
}
