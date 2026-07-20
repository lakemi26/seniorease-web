import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '@/presentation/components/ui/Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'Accordion para seções de conteúdo expansível. Use para perguntas frequentes ou conteúdos que precisam ser revelados sob demanda. Cada item deve ser acionado por um button com aria-expanded.',
      },
    },
  },
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Permite abrir múltiplos itens simultaneamente',
    },
    items: { table: { disable: true } },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

const defaultItems = [
  { title: 'Preciso saber muito de tecnologia?', content: 'Não. A plataforma foi criada para oferecer uma navegação clara, previsível e orientada.' },
  { title: 'Posso aumentar o tamanho dos textos?', content: 'Sim. Você poderá escolher entre diferentes tamanhos de fonte e níveis de espaçamento.' },
  { title: 'Posso mudar essas configurações depois?', content: 'Sim. As preferências podem ser alteradas sempre que necessário.' },
]

export const Default: Story = {
  args: {
    items: defaultItems,
    allowMultiple: false,
  },
}

export const MultipleOpen: Story = {
  args: {
    items: defaultItems,
    allowMultiple: true,
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ title: 'Única pergunta', content: 'Resposta para a única pergunta do accordion.' }],
  },
}
