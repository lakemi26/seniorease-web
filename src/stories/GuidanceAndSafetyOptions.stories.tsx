import type { Meta, StoryObj } from '@storybook/react'
import { GuidanceAndSafetyOptions } from '@/modules/personalization/presentation/components/GuidanceAndSafetyOptions'
import { useState } from 'react'

const meta: Meta<typeof GuidanceAndSafetyOptions> = {
  title: 'Personalização/GuidanceAndSafetyOptions',
  component: GuidanceAndSafetyOptions,
  parameters: {
    docs: {
      description: {
        component:
          'Opções de orientação e segurança: Feedback reforçado, Confirmação de ações importantes e Reduzir animações. Utiliza SwitchField para cada opção.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GuidanceAndSafetyOptions>

function Wrapper() {
  const [state, setState] = useState({
    enhancedFeedback: false,
    confirmCriticalActions: true,
    reduceMotion: false,
  })
  return (
    <GuidanceAndSafetyOptions
      {...state}
      onChange={(key, value) => setState((prev) => ({ ...prev, [key]: value }))}
    />
  )
}

export const Interativo: Story = {
  render: () => <Wrapper />,
}
