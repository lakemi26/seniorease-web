import type { Meta, StoryObj } from '@storybook/react'
import { ReminderPreference } from '@/modules/personalization/presentation/components/ReminderPreference'
import { useState } from 'react'

const meta: Meta<typeof ReminderPreference> = {
  title: 'Personalização/ReminderPreference',
  component: ReminderPreference,
  parameters: {
    docs: {
      description: {
        component:
          'Preferência de lembretes: controla a exibição geral de lembretes de atividades no painel. Utiliza SwitchField.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ReminderPreference>

function Wrapper() {
  const [enabled, setEnabled] = useState(true)
  return <ReminderPreference remindersEnabled={enabled} onChange={setEnabled} />
}

export const Ativado: Story = {
  render: () => <Wrapper />,
}

export const Desativado: Story = {
  args: {
    remindersEnabled: false,
    onChange: () => {},
  },
}
