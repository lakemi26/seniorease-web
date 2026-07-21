import type { Meta, StoryObj } from '@storybook/react'
import { ActivityCard } from '@/modules/activities/presentation/components/ActivityCard'
import type { Activity } from '@/modules/activities/domain/entities'

const baseActivity: Activity = {
  id: '1',
  userId: 'user-1',
  title: 'Consulta médica',
  description: 'Hospital São Lucas, 14h, levar documentos',
  category: 'health',
  scheduledAt: new Date('2026-12-25T14:00:00'),
  hasTime: true,
  status: 'pending',
  priority: 'high',
  steps: [
    { id: 's1', title: 'Separar documentos', order: 1, completed: false, completedAt: null },
    { id: 's2', title: 'Confirmar horário', order: 2, completed: true, completedAt: new Date('2026-12-24') },
  ],
  reminder: { enabled: true, remindAt: new Date('2026-12-25T13:00:00') },
  startedAt: null,
  completedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const meta = {
  title: 'Atividades/ActivityCard',
  component: ActivityCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityCard>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {
  args: { activity: baseActivity },
}

export const SemHorario: Story = {
  args: {
    activity: { ...baseActivity, hasTime: false },
  },
}

export const SemEtapas: Story = {
  args: {
    activity: { ...baseActivity, steps: [] },
  },
}

export const Concluida: Story = {
  args: {
    activity: { ...baseActivity, status: 'completed', completedAt: new Date() },
  },
}

export const Atrasada: Story = {
  args: {
    activity: {
      ...baseActivity,
      scheduledAt: new Date('2024-01-01T10:00:00'),
    },
  },
}

export const MuitasEtapas: Story = {
  args: {
    activity: {
      ...baseActivity,
      steps: Array.from({ length: 10 }, (_, i) => ({
        id: `s${i}`,
        title: `Passo ${i + 1}`,
        order: i + 1,
        completed: i < 4,
        completedAt: i < 4 ? new Date() : null,
      })),
    },
  },
}

export const DescricaoLonga: Story = {
  args: {
    activity: {
      ...baseActivity,
      description: 'Esta é uma descrição muito longa que deve ser truncada após duas linhas para não ocupar muito espaço no card. O line-clamp-2 deve cortar o texto excedente e mostrar reticências no final.',
    },
  },
}
