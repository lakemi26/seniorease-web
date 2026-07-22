import type { Meta, StoryObj } from '@storybook/react'
import { HelpRelatedArticles } from '@/modules/help/presentation/components/HelpRelatedArticles'

const meta = {
  title: 'Ajuda/HelpRelatedArticles',
  component: HelpRelatedArticles,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpRelatedArticles>

export default meta
type Story = StoryObj<typeof meta>

export const ComArtigos: Story = {
  args: {
    articles: [
      { id: '1', slug: 'criar-atividade', categoryId: 'activities', title: 'Criar uma atividade', summary: '', keywords: [], availableInBasicMode: true },
      { id: '2', slug: 'adicionar-etapas', categoryId: 'activities', title: 'Adicionar etapas', summary: '', keywords: [], availableInBasicMode: true },
      { id: '3', slug: 'editar-atividade', categoryId: 'activities', title: 'Editar uma atividade', summary: '', keywords: [], availableInBasicMode: true },
    ],
    onSelectArticle: () => {},
  },
}
