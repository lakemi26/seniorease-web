import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReminderNotificationItem } from '../components/ReminderNotificationItem'
import type { ReminderNotification } from '../types'

const baseNotification: ReminderNotification = {
  id: 'notif-1',
  activityId: 'act-1',
  title: 'Consulta médica',
  message: 'Consulta médica está programada para agora.',
  remindAt: new Date('2026-07-24T10:00:00'),
  scheduledAt: new Date('2026-07-24T10:00:00'),
  readAt: null,
  dismissedAt: null,
  status: 'due',
}

describe('ReminderNotificationItem', () => {
  const requiredProps = { onView: vi.fn(), onDismiss: vi.fn() }

  it('renderiza título e mensagem', () => {
    render(<ReminderNotificationItem notification={baseNotification} {...requiredProps} />)
    expect(screen.getByText('Consulta médica')).toBeDefined()
    expect(screen.getByText('Consulta médica está programada para agora.')).toBeDefined()
  })

  it('exibe botão Ver atividade', () => {
    render(<ReminderNotificationItem notification={baseNotification} {...requiredProps} />)
    expect(screen.getByText('Ver atividade')).toBeDefined()
  })

  it('exibe botão Continuar quando status é due e onContinue é fornecido', () => {
    render(<ReminderNotificationItem notification={baseNotification} {...requiredProps} onContinue={vi.fn()} />)
    expect(screen.getByText('Continuar atividade')).toBeDefined()
  })

  it('chama onView ao clicar em Ver atividade', () => {
    const onView = vi.fn()
    render(<ReminderNotificationItem notification={baseNotification} onView={onView} onDismiss={vi.fn()} />)
    screen.getByText('Ver atividade').click()
    expect(onView).toHaveBeenCalledWith('act-1')
  })

  it('exibe status overdue com classe de perigo', () => {
    const overdue: ReminderNotification = {
      ...baseNotification,
      status: 'overdue',
      message: 'O lembrete de Consulta médica já passou.',
    }
    const { container } = render(<ReminderNotificationItem notification={overdue} {...requiredProps} />)
    const msgEl = container.querySelector('.text-error')
    expect(msgEl).not.toBeNull()
  })
})
