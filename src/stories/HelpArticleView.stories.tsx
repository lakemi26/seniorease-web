import type { Meta, StoryObj } from '@storybook/react'
import { HelpArticleView } from '@/modules/help/presentation/components/HelpArticleView'

const meta = {
  title: 'Ajuda/HelpArticleView',
  component: HelpArticleView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpArticleView>

export default meta
type Story = StoryObj<typeof meta>

export const ComEtapas: Story = {
  args: {
    article: {
      id: '1',
      slug: 'criar-atividade',
      categoryId: 'activities',
      title: 'Criar uma atividade',
      summary: 'Cadastre uma tarefa ou compromisso e, se desejar, divida em etapas.',
      keywords: ['criar', 'atividade'],
      steps: [
        { id: 's1', title: 'Abrir "Minhas atividades"', description: 'No menu, selecione "Atividades".' },
        { id: 's2', title: 'Selecionar "Nova atividade"', description: 'Escolha o botão "Nova atividade".' },
        { id: 's3', title: 'Informar o título e a data', description: 'Dê um nome para a atividade e escolha a data e horário.' },
      ],
      relatedArticleIds: ['2'],
      relatedRoute: '/atividades?modal=nova',
      relatedRouteLabel: 'Criar nova atividade',
      availableInBasicMode: true,
    },
    interfaceMode: 'complete',
    onSelectArticle: () => {},
    onGoBack: () => {},
  },
}

export const SemEtapas: Story = {
  args: {
    article: {
      id: '2',
      slug: 'conhecer-dashboard',
      categoryId: 'gettingStarted',
      title: 'Conhecer o dashboard',
      summary: 'O dashboard é a tela principal onde você vê um resumo das suas atividades.',
      keywords: ['dashboard', 'inicio'],
      content: [
        'O dashboard é a primeira tela que aparece depois de entrar no SeniorEase.',
        'Nele você encontra sua próxima atividade, atividades de hoje, e atalhos rápidos.',
      ],
      relatedArticleIds: ['3'],
      relatedRoute: '/dashboard',
      relatedRouteLabel: 'Abrir dashboard',
      availableInBasicMode: true,
    },
    interfaceMode: 'complete',
    onSelectArticle: () => {},
    onGoBack: () => {},
  },
}

export const ArtigoLongo: Story = {
  args: {
    article: {
      id: '3',
      slug: 'adicionar-lembrete',
      categoryId: 'reminders',
      title: 'Adicionar um lembrete',
      summary: 'Configure um aviso para não esquecer uma atividade importante.',
      keywords: ['lembrete', 'aviso'],
      steps: [
        { id: 's1', title: 'Criar ou editar uma atividade', description: 'Na tela de criação ou edição, localize a seção de lembrete.' },
        { id: 's2', title: 'Ativar o lembrete', description: 'Escolha a opção "Sim, quero um lembrete".' },
        { id: 's3', title: 'Escolher o horário', description: 'Defina se o lembrete será no horário da atividade ou antes.' },
        { id: 's4', title: 'Salvar a atividade', description: 'Confirme a atividade. O lembrete será ativado.' },
      ],
      relatedArticleIds: ['4', '5'],
      relatedRoute: '/atividades?modal=nova',
      relatedRouteLabel: 'Criar nova atividade',
      availableInBasicMode: true,
    },
    interfaceMode: 'complete',
    onSelectArticle: () => {},
    onGoBack: () => {},
  },
}

export const SemRotaRelacionada: Story = {
  args: {
    article: {
      id: '4',
      slug: 'sair-sem-perder',
      categoryId: 'security',
      title: 'Sair sem perder o progresso',
      summary: 'Entenda que seu progresso é salvo automaticamente.',
      keywords: ['salvar', 'progresso'],
      content: [
        'Suas atividades e preferências são salvas automaticamente.',
        'Se você sair da execução, seu progresso é mantido.',
      ],
      availableInBasicMode: true,
    },
    interfaceMode: 'complete',
    onSelectArticle: () => {},
    onGoBack: () => {},
  },
}

export const ModoBasico: Story = {
  args: {
    article: {
      id: '1',
      slug: 'criar-atividade',
      categoryId: 'activities',
      title: 'Criar uma atividade',
      summary: 'Cadastre uma tarefa ou compromisso.',
      keywords: ['criar', 'atividade'],
      steps: [
        { id: 's1', title: 'Abrir "Minhas atividades"', description: 'No menu, selecione "Atividades".' },
        { id: 's2', title: 'Selecionar "Nova atividade"', description: 'Escolha o botão "Nova atividade".' },
      ],
      relatedRoute: '/atividades?modal=nova',
      relatedRouteLabel: 'Criar nova atividade',
      availableInBasicMode: true,
    },
    interfaceMode: 'basic',
    onSelectArticle: () => {},
    onGoBack: () => {},
  },
}
