import type { Meta, StoryObj } from '@storybook/react'
import { PersonalInformationSection } from '@/modules/authentication/presentation/components/PersonalInformationSection'

const mockProfile = {
  id: '123',
  name: 'Maria Silva',
  email: 'maria.silva@exemplo.com',
  firstAccessCompleted: true,
  onboardingStep: 6,
  createdAt: new Date('2026-01-15'),
  updatedAt: new Date('2026-07-20'),
}

const registerMock = () => ({
  onChange: () => {},
  onBlur: () => {},
  name: 'name' as const,
  ref: () => {},
})

const meta: Meta<typeof PersonalInformationSection> = {
  title: 'Profile/PersonalInformationSection',
  component: PersonalInformationSection,
  parameters: { viewport: { defaultViewport: 'desktop' } },
}

export default meta
type Story = StoryObj<typeof PersonalInformationSection>

export const Default: Story = {
  args: {
    profile: mockProfile,
    isEditing: false,
    isSaving: false,
    nameError: null,
    nameSuccess: null,
    currentName: 'Maria Silva',
    onStartEditing: () => {},
    onCancelEditing: () => {},
    register: registerMock as never,
    errors: {},
    onSubmit: (e) => { e.preventDefault() },
  },
}

export const LongName: Story = {
  args: {
    ...Default.args,
    profile: { ...mockProfile, name: 'Maria Aparecida da Silva Santos Oliveira' },
    currentName: 'Maria Aparecida da Silva Santos Oliveira',
  },
}

export const LongEmail: Story = {
  args: {
    ...Default.args,
    profile: { ...mockProfile, email: 'maria.aparecida.santos.oliveira@exemplo.com.br' },
  },
}

export const EditMode: Story = {
  args: {
    ...Default.args,
    isEditing: true,
  },
}

export const ValidationError: Story = {
  args: {
    ...Default.args,
    isEditing: true,
    nameError: 'Use pelo menos 2 caracteres.',
    errors: { name: { type: 'too_small', message: 'Use pelo menos 2 caracteres.' } },
  },
}

export const Saving: Story = {
  args: {
    ...Default.args,
    isEditing: true,
    isSaving: true,
  },
}
