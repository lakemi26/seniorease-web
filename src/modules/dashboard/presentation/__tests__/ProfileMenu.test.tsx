import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthContext, type AuthContextType } from '@/presentation/providers/AuthProvider'
import { ProfileMenu } from '../components/ProfileMenu'

const mockSignOut = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/dashboard',
}))

function renderWithAuth(overrides?: Partial<AuthContextType>) {
  const defaultContext: AuthContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: { uid: '123', email: 'maria@teste.com' } as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: { name: 'Maria Silva', email: 'maria@teste.com' } as any,
    isAuthenticated: true,
    isLoading: false,
    signOut: mockSignOut,
    refreshProfile: vi.fn(),
    updateProfileState: vi.fn(),
  }

  return render(
    <AuthContext.Provider value={{ ...defaultContext, ...overrides }}>
      <ProfileMenu />
    </AuthContext.Provider>
  )
}

describe('ProfileMenu', () => {
  beforeEach(() => {
    mockSignOut.mockClear()
  })

  it('exibe a inicial do nome no botão', () => {
    renderWithAuth()
    expect(screen.getByText('M')).toBeInTheDocument()
  })

  it('abre o menu ao clicar no botão', async () => {
    const user = userEvent.setup()
    renderWithAuth()

    const button = screen.getByRole('button', { name: /menu do perfil/i })
    await user.click(button)

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Maria Silva')).toBeInTheDocument()
    expect(screen.getByText('maria@teste.com')).toBeInTheDocument()
  })

  it('fecha o menu ao pressionar Escape', async () => {
    const user = userEvent.setup()
    renderWithAuth()

    const button = screen.getByRole('button', { name: /menu do perfil/i })
    await user.click(button)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('possui aria-expanded no botão', async () => {
    const user = userEvent.setup()
    renderWithAuth()

    const button = screen.getByRole('button', { name: /menu do perfil/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })
})
