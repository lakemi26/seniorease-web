import type { Meta, StoryObj } from '@storybook/react'
import { PersonalizationErrorState } from '@/modules/personalization/presentation/components/PersonalizationErrorState'

const meta: Meta<typeof PersonalizationErrorState> = {
  title: 'Personalização/PersonalizationErrorState',
  component: PersonalizationErrorState,
  parameters: {
    docs: {
      description: {
        component:
          'Estado de erro da página de personalização. Exibe um ícone de alerta, mensagem e botão para tentar novamente.',
      },
    },
  },
  argTypes: {
    onRetry: { action: 'Tentou novamente' },
  },
}

export default meta
type Story = StoryObj<typeof PersonalizationErrorState>

export ComErro: Story = {
  args: {
    onRetry: () => {},
  },
}
