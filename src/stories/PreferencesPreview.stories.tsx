import type { Meta, StoryObj } from '@storybook/react'
import { PreferencesPreview } from '@/modules/personalization/presentation/components/PreferencesPreview'
import { DEFAULT_USER_PREFERENCES } from '@/modules/authentication/domain/entities'
import type { UserPreferences } from '@/modules/authentication/domain/entities'

const meta: Meta<typeof PreferencesPreview> = {
  title: 'Personalização/PreferencesPreview',
  component: PreferencesPreview,
  parameters: {
    docs: {
      description: {
        component:
          'Painel de pré-visualização que reflete as preferências atuais (tamanho da fonte, contraste, espaçamento, modo da interface). A aparência do card e a quantidade de informações exibidas mudam conforme o draft.',
      },
    },
  },
  argTypes: {
    draft: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof PreferencesPreview>

export const Padrao: Story = {
  args: {
    draft: DEFAULT_USER_PREFERENCES,
  },
}

export const AltoContraste: Story = {
  args: {
    draft: { ...DEFAULT_USER_PREFERENCES, contrast: 'high' } as UserPreferences,
  },
}

export const Escuro: Story = {
  args: {
    draft: { ...DEFAULT_USER_PREFERENCES, contrast: 'dark' } as UserPreferences,
  },
}

export const ModoBasico: Story = {
  args: {
    draft: { ...DEFAULT_USER_PREFERENCES, interfaceMode: 'basic' } as UserPreferences,
  },
}

export const EspacamentoAmpliado: Story = {
  args: {
    draft: { ...DEFAULT_USER_PREFERENCES, spacing: 'expanded' } as UserPreferences,
  },
}

export const TudoPersonalizado: Story = {
  args: {
    draft: {
      ...DEFAULT_USER_PREFERENCES,
      fontSize: 'extraLarge',
      contrast: 'high',
      spacing: 'expanded',
      interfaceMode: 'basic',
      enhancedFeedback: true,
      confirmCriticalActions: true,
      reduceMotion: true,
      remindersEnabled: true,
    } as UserPreferences,
  },
}
