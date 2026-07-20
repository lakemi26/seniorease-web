import type { Meta, StoryObj } from '@storybook/react'
import { accessibilityFeatures } from '@/modules/landing/data/accessibilityFeatures'

const AccessibilityControlPreview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {accessibilityFeatures.map((feature) => (
        <div key={feature.title} className="flex flex-col gap-3 p-4 bg-surface rounded-lg border border-border">
          <h3 className="font-semibold text-text">{feature.title}</h3>
          <p className="text-sm text-text-secondary">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

const meta: Meta<typeof AccessibilityControlPreview> = {
  title: 'Components/AccessibilityControl',
  component: AccessibilityControlPreview,
  parameters: {
    docs: {
      description: {
        component:
          'Painel de controles de acessibilidade. Permite ajustar tamanho da fonte, contraste, espaçamento, modo de interface e animações. As alterações são salvas no localStorage e aplicadas via data attributes no elemento html.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AccessibilityControlPreview>

export const Default: Story = {}
