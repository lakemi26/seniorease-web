import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotificationsPageContent } from '../components/NotificationsPageContent'
import { NotificationsContext } from '../providers/NotificationsProvider'
import { PreferencesContext } from '@/presentation/providers/PreferencesProvider'
import { AccessibilityContext } from '@/presentation/providers/AccessibilityProvider'
import type { NotificationsContextType } from '../providers/NotificationsProvider'
import type { UserPreferences } from '@/modules/authentication/domain/entities'
import type { PreferencesContextType } from '@/presentation/providers/PreferencesProvider'
import type { AccessibilityContextType } from '@/presentation/providers/AccessibilityProvider'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const defaultPreferences: UserPreferences = {
  fontSize: 'normal',
  contrast: 'default',
  spacing: 'normal',
  interfaceMode: 'complete',
  enhancedFeedback: true,
  confirmCriticalActions: true,
  reduceMotion: false,
  remindersEnabled: true,
  updatedAt: '',
}

const defaultPrefsCtx: PreferencesContextType = {
  preferences: defaultPreferences,
  isLoading: false,
  error: null,
  updatePreferences: vi.fn(),
  resetPreferences: vi.fn(),
  refreshPreferences: vi.fn(),
}

const defaultAccessibilityCtx: AccessibilityContextType = {
  fontSize: 'normal',
  contrast: 'normal',
  spacing: 'normal',
  interface: 'complete',
  motion: 'normal',
  setFontSize: vi.fn(),
  setContrast: vi.fn(),
  setSpacing: vi.fn(),
  setInterface: vi.fn(),
  setMotion: vi.fn(),
  resetPreferences: vi.fn(),
}

function createMockNotifContext(overrides: Partial<NotificationsContextType> = {}): NotificationsContextType {
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

function renderWithProviders(
  notifCtx: NotificationsContextType,
  prefsCtx: PreferencesContextType = defaultPrefsCtx,
  a11yCtx: AccessibilityContextType = defaultAccessibilityCtx,
) {
  return render(
    <AccessibilityContext.Provider value={a11yCtx}>
      <PreferencesContext.Provider value={prefsCtx}>
        <NotificationsContext.Provider value={notifCtx}>
          <NotificationsPageContent />
        </NotificationsContext.Provider>
      </PreferencesContext.Provider>
    </AccessibilityContext.Provider>
  )
}

describe('NotificationsPageContent', () => {
  it('exibe estado vazio quando não há notificações', () => {
    renderWithProviders(createMockNotifContext())
    expect(screen.getByText('Nenhuma notificação no momento.')).toBeDefined()
  })

  it('exibe esqueleto durante carregamento', () => {
    renderWithProviders(createMockNotifContext({ isLoading: true }))
    expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(1)
  })

  it('exibe notificações pendentes', () => {
    const notification = {
      id: 'n1',
      activityId: 'a1',
      title: 'Teste',
      message: 'Notificação de teste.',
      remindAt: new Date(),
      scheduledAt: new Date(),
      readAt: null,
      dismissedAt: null,
      status: 'due' as const,
    }
    const ctx = createMockNotifContext({
      notifications: [notification],
      dueNotifications: [notification],
      upcomingNotifications: [],
      unreadCount: 1,
    })
    renderWithProviders(ctx)
    expect(screen.getByText('Teste')).toBeDefined()
  })

  it('exibe estado de erro quando há erro', () => {
    renderWithProviders(createMockNotifContext({ error: 'Erro de teste' }))
    expect(screen.getByText('Não foi possível carregar as notificações.')).toBeDefined()
  })
})
