import type { Meta, StoryObj } from '@storybook/react'
import { AccountSecuritySection } from '@/modules/authentication/presentation/components/AccountSecuritySection'

const meta: Meta<typeof AccountSecuritySection> = {
  title: 'Profile/AccountSecuritySection',
  component: AccountSecuritySection,
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export default meta
type Story = StoryObj<typeof AccountSecuritySection>

export const Default: Story = {
  args: {
    email: 'maria@exemplo.com',
    isResetting: false,
    showResetConfirm: false,
    resetError: null,
    resetSuccess: null,
    onOpenReset: () => {},
    onCloseReset: () => {},
    onConfirmReset: async () => {},
  },
}

export const ResetConfirmationOpen: Story = {
  args: {
    ...Default.args,
    showResetConfirm: true,
  },
}

export const ResetSuccess: Story = {
  args: {
    ...Default.args,
    resetSuccess: 'Enviamos as orientações para redefinir sua senha.',
  },
}

export const ResetError: Story = {
  args: {
    ...Default.args,
    resetError: 'Não foi possível enviar o link. Verifique sua conexão e tente novamente.',
  },
}

export const Resetting: Story = {
  args: {
    ...Default.args,
    showResetConfirm: true,
    isResetting: true,
  },
}

export const Mobile: Story = {
  args: { ...Default.args },
  parameters: { viewport: { defaultViewport: 'mobile' } },
}
