import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from '@/presentation/components/layout/Navbar'
import { AccessibilityProvider } from '@/presentation/providers/AccessibilityProvider'

const NavbarWithProvider = () => (
  <AccessibilityProvider>
    <Navbar />
  </AccessibilityProvider>
)

const meta: Meta<typeof NavbarWithProvider> = {
  title: 'Layout/Navbar',
  component: NavbarWithProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Barra de navegação principal da página. No desktop exibe links e botão Entrar. No mobile exibe um botão de menu que abre um painel lateral acessível com aria-expanded, aria-controls e fechamento por Escape.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavbarWithProvider>

export const Desktop: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
}

export const MobileSmall: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobileSmall',
    },
  },
}
