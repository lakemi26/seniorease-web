import type { Meta, StoryObj } from '@storybook/react'
import { HelpCategoryCard } from '@/modules/help/presentation/components/HelpCategoryCard'

const meta = {
  title: 'Ajuda/HelpCategoryCard',
  component: HelpCategoryCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpCategoryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Atividades: Story = {
  args: {
    category: {
      id: 'activities',
      title: 'Atividades',
      description: 'Orientações para criar, acompanhar e concluir atividades.',
      icon: 'ListTodo',
      priority: 1,
    },
    articleCount: 8,
    onClick: () => {},
  },
}

export const PrimeirosPassos: Story = {
  args: {
    category: {
      id: 'gettingStarted',
      title: 'Primeiros passos',
      description: 'Orientações para começar a utilizar o SeniorEase.',
      icon: 'Compass',
      priority: 2,
    },
    articleCount: 4,
    onClick: () => {},
  },
}

export const Personalizacao: Story = {
  args: {
    category: {
      id: 'personalization',
      title: 'Personalização',
      description: 'Ajuda para ajustar a forma como o SeniorEase aparece.',
      icon: 'SlidersHorizontal',
      priority: 3,
    },
    articleCount: 6,
    onClick: () => {},
  },
}

export const ComMuitosArtigos: Story = {
  args: {
    category: {
      id: 'activities',
      title: 'Atividades',
      description: 'Orientações para criar, acompanhar e concluir atividades.',
      icon: 'ListTodo',
      priority: 1,
    },
    articleCount: 99,
    onClick: () => {},
  },
}
