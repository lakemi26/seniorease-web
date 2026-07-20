import type { Meta, StoryObj } from '@storybook/react'
import { PreviewPanel } from '@/presentation/components/ui/PreviewPanel'

const meta: Meta<typeof PreviewPanel> = {
  title: 'UI/PreviewPanel',
  component: PreviewPanel,
  parameters: {
    docs: {
      description: {
        component:
          'Painel de pré-visualização que reflete as configurações atuais de acessibilidade (fonte, contraste, espaçamento, modo da interface). Deve ser usado dentro de um AccessibilityProvider.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PreviewPanel>

export const Padrao: Story = {
  args: {},
}
