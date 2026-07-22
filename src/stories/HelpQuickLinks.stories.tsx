import type { Meta, StoryObj } from '@storybook/react'
import { HelpQuickLinks } from '@/modules/help/presentation/components/HelpQuickLinks'

const meta = {
  title: 'Ajuda/HelpQuickLinks',
  component: HelpQuickLinks,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpQuickLinks>

export default meta
type Story = StoryObj<typeof meta>

export const QuatroAtalhos: Story = {
  args: {
    links: [
      { title: 'Criar uma atividade', description: 'Saiba como cadastrar uma nova atividade', articleSlug: 'criar-atividade', icon: 'PlusCircle' },
      { title: 'Continuar uma atividade', description: 'Retome uma atividade em andamento', articleSlug: 'continuar-atividade', icon: 'PlayCircle' },
      { title: 'Aumentar o tamanho do texto', description: 'Deixe a leitura mais confortável', articleSlug: 'aumentar-texto', icon: 'Type' },
      { title: 'Redefinir minha senha', description: 'Crie uma nova senha de acesso', articleSlug: 'redefinir-senha', icon: 'KeyRound' },
    ],
    onLinkClick: () => {},
  },
}
