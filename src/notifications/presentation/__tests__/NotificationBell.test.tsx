import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotificationBell } from '../components/NotificationBell'
import { NotificationsContext } from '../providers/NotificationsProvider'
import type { NotificationsContextType } from '../providers/NotificationsProvider'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

function createMockContext(overrides: Partial<NotificationsContextType> = {}): NotificationsContextType {
  return {
    notifications: [],
    dueNotifications: [],
    upcomingNotifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
    dismiss: vi.fn(),
    retry: vi.fn(),
    ...overrides,
  }
}

function renderWithMockContext(context: NotificationsContextType) {
  return render(
    <NotificationsContext.Provider value={context}>
      <NotificationBell />
    </NotificationsContext.Provider>
  )
}

describe('NotificationBell', () => {
  it('renderiza o ícone de sino', () => {
    renderWithMockContext(createMockContext())
    expect(screen.getByLabelText('Notificações')).toBeDefined()
  })

  it('exibe o contador quando há não lidas', () => {
    renderWithMockContext(createMockContext({ unreadCount: 3 }))
    expect(screen.getByText('3')).toBeDefined()
  })

  it('não exibe contador quando não há não lidas', () => {
    renderWithMockContext(createMockContext({ unreadCount: 0 }))
    expect(screen.queryByText('0')).toBeNull()
  })
})
