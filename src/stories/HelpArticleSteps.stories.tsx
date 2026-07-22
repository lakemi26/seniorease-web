import type { Meta, StoryObj } from '@storybook/react'
import { HelpArticleSteps } from '@/modules/help/presentation/components/HelpArticleSteps'

const meta = {
  title: 'Ajuda/HelpArticleSteps',
  component: HelpArticleSteps,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HelpArticleSteps>

export default meta
type Story = StoryObj<typeof meta>

export const ComEtapas: Story = {
  args: {
    steps: [
      { id: 's1', title: 'Abrir "Minhas atividades"', description: 'No menu, selecione "Atividades".' },
      { id: 's2', title: 'Selecionar "Nova atividade"', description: 'Escolha o botão "Nova atividade".' },
      { id: 's3', title: 'Informar o título e a data', description: 'Dê um nome para a atividade e escolha a data e horário.' },
      { id: 's4', title: 'Adicionar etapas, se desejar', description: 'Você pode dividir a atividade em passos menores.' },
      { id: 's5', title: 'Selecionar "Salvar atividade"', description: 'Confirme para salvar.' },
    ],
  },
}

export const EtapaUnica: Story = {
  args: {
    steps: [
      { id: 's1', title: 'Abrir o dashboard', description: 'No menu, selecione "Início".' },
    ],
  },
}

export const PassoLongo: Story = {
  args: {
    steps: [
      { id: 's1', title: 'Abrir a tela de personalização e localizar a seção de contraste entre as opções disponíveis', description: 'No menu completo, selecione "Configurações". Role a página até encontrar a seção "Contraste" com as opções de exibição.' },
    ],
  },
}
