import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PersonalizationPageContent } from '@/modules/personalization/presentation/components/PersonalizationPageContent'
import { DEFAULT_USER_PREFERENCES } from '@/modules/authentication/domain/entities'
import type { PreferencesContextType } from '@/presentation/providers/PreferencesProvider'

const mockUpdatePreferences = vi.fn()
const mockResetPreferences = vi.fn()
const mockRouterReplace = vi.fn()
const mockRouterPush = vi.fn()

let mockContext: PreferencesContextType = {
  preferences: DEFAULT_USER_PREFERENCES,
  isLoading: false,
  error: null,
  updatePreferences: mockUpdatePreferences,
  resetPreferences: mockResetPreferences,
  refreshPreferences: vi.fn(),
}

vi.mock('@/presentation/hooks/usePreferences', () => ({
  usePreferences: () => mockContext,
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
  }),
}))

vi.mock('@/presentation/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { uid: 'test-uid', displayName: 'Test', email: 'test@test.com' },
  }),
}))

function renderPage() {
  return render(<PersonalizationPageContent />)
}

describe('PersonalizationPageContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockContext = {
      preferences: DEFAULT_USER_PREFERENCES,
      isLoading: false,
      error: null,
      updatePreferences: mockUpdatePreferences,
      resetPreferences: mockResetPreferences,
      refreshPreferences: vi.fn(),
    }
  })

  describe('carregamento', () => {
    it('deve mostrar skeleton quando isLoading', () => {
      mockContext = { ...mockContext, isLoading: true }
      const { container } = renderPage()
      expect(container.querySelector('[aria-label="Carregando suas preferências."]')).toBeTruthy()
    })

    it('deve mostrar erro quando houver erro', () => {
      mockContext = { ...mockContext, error: 'Erro' }
      renderPage()
      expect(screen.getByText('Não foi possível carregar suas preferências.')).toBeTruthy()
    })

    it('deve mostrar conteúdo quando carregado', () => {
      renderPage()
      expect(screen.getByText('Personalizar minha experiência')).toBeTruthy()
    })
  })

  describe('tamanho dos textos', () => {
    it('deve mostrar opção Normal selecionada por padrão', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const normal = radios.find(r => (r as HTMLInputElement).value === 'normal')
      expect(normal).toBeTruthy()
      expect((normal as HTMLInputElement).checked).toBe(true)
    })

    it('deve alternar para Grande', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const grande = radios.find(r => (r as HTMLInputElement).value === 'large')
      expect(grande).toBeTruthy()
      fireEvent.click(grande!)
      expect((grande as HTMLInputElement).checked).toBe(true)
    })

    it('deve alternar para Muito grande', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const muitoGrande = radios.find(r => (r as HTMLInputElement).value === 'extraLarge')
      expect(muitoGrande).toBeTruthy()
      fireEvent.click(muitoGrande!)
      expect((muitoGrande as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('contraste', () => {
    it('deve mostrar opção Padrão selecionada por padrão', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const padrao = radios.find(r => (r as HTMLInputElement).value === 'default')
      expect(padrao).toBeTruthy()
    })

    it('deve alternar para Alto contraste', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const alto = radios.find(r => (r as HTMLInputElement).value === 'high')
      expect(alto).toBeTruthy()
      fireEvent.click(alto!)
      expect((alto as HTMLInputElement).checked).toBe(true)
    })

    it('deve alternar para Escuro', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const escuro = radios.find(r => (r as HTMLInputElement).value === 'dark')
      expect(escuro).toBeTruthy()
      fireEvent.click(escuro!)
      expect((escuro as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('espaçamento', () => {
    it('deve mostrar opção Normal selecionada por padrão', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const normal = radios.find(r => (r as HTMLInputElement).value === 'normal' && r.getAttribute('name') === 'spacing')
      expect(normal).toBeTruthy()
    })

    it('deve alternar para Ampliado', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const ampliado = radios.find(r => (r as HTMLInputElement).value === 'expanded')
      expect(ampliado).toBeTruthy()
      fireEvent.click(ampliado!)
      expect((ampliado as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('modo da interface', () => {
    it('deve mostrar opção Modo básico', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const basico = radios.find(r => (r as HTMLInputElement).value === 'basic')
      expect(basico).toBeTruthy()
    })

    it('deve mostrar opção Modo completo', () => {
      renderPage()
      const radios = screen.getAllByRole('radio')
      const completo = radios.find(r => (r as HTMLInputElement).value === 'complete')
      expect(completo).toBeTruthy()
    })
  })

  describe('orientação e segurança', () => {
    it('deve mostrar switch de Feedback reforçado', () => {
      renderPage()
      expect(screen.getByText('Feedback reforçado')).toBeTruthy()
      const switches = screen.getAllByRole('switch')
      expect(switches.length).toBeGreaterThanOrEqual(4)
    })

    it('deve mostrar switch de Confirmação de ações', () => {
      renderPage()
      expect(screen.getByText('Confirmação de ações importantes')).toBeTruthy()
    })

    it('deve mostrar switch de Reduzir animações', () => {
      renderPage()
      expect(screen.getByText('Reduzir animações')).toBeTruthy()
    })
  })

  describe('lembretes', () => {
    it('deve mostrar switch de lembretes', () => {
      renderPage()
      expect(screen.getByText('Mostrar lembretes de atividades')).toBeTruthy()
    })
  })

  describe('pré-visualização', () => {
    it('deve mostrar seção de pré-visualização', () => {
      renderPage()
      expect(screen.getByText('Veja como ficará')).toBeTruthy()
    })
  })

  describe('salvamento', () => {
    it('deve mostrar botão Salvar preferências', () => {
      renderPage()
      expect(screen.getByText('Salvar preferências')).toBeTruthy()
    })

    it('deve mostrar botão Restaurar configurações padrão', () => {
      renderPage()
      expect(screen.getByText('Restaurar configurações padrão')).toBeTruthy()
    })
  })

  describe('acessibilidade', () => {
    it('deve ter um h1', () => {
      renderPage()
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    })

    it('deve ter LiveRegion', () => {
      renderPage()
      expect(screen.getByRole('status')).toBeTruthy()
    })

    it('deve usar fieldset para grupos de rádio', () => {
      renderPage()
      const fieldsets = screen.getAllByRole('group')
      expect(fieldsets.length).toBeGreaterThanOrEqual(4)
    })
  })
})
