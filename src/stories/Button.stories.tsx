import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/presentation/components/ui/Button'
import { CheckCircle } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Botão principal do Design System. Deve ser usado para ações primárias, secundárias, outline e ghost. Suporta estado de loading e ícone opcional.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Define o estilo visual do botão',
    },
    size: {
      control: 'select',
      options: ['normal', 'large'],
      description: 'Define o tamanho do botão',
    },
    loading: {
      control: 'boolean',
      description: 'Exibe indicador de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Começar agora',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Salvar',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Conhecer a plataforma',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancelar',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Criar minha conta',
  },
}

export const WithIcon: Story = {
  args: {
    icon: <CheckCircle />,
    children: 'Confirmar',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Salvando...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Avançar',
  },
}

export const FocusVisible: Story = {
  args: {
    children: 'Foco visível',
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
}
