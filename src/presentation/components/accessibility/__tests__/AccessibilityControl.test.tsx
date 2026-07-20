import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccessibilityProvider } from '@/presentation/providers/AccessibilityProvider'
import { AccessibilityControl } from '@/presentation/components/accessibility/AccessibilityControl'

function renderWithProvider(ui: React.ReactElement) {
  return render(<AccessibilityProvider>{ui}</AccessibilityProvider>)
}

describe('AccessibilityControl', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('altera o tamanho da fonte', async () => {
    const user = userEvent.setup()
    renderWithProvider(<AccessibilityControl />)

    const grandeButton = screen.getByRole('radio', { name: 'Grande' })
    await user.click(grandeButton)

    expect(document.documentElement).toHaveAttribute('data-font-size', 'large')
  })

  it('altera o contraste', async () => {
    const user = userEvent.setup()
    renderWithProvider(<AccessibilityControl />)

    const highContrastButton = screen.getByRole('radio', { name: 'Alto contraste' })
    await user.click(highContrastButton)

    expect(document.documentElement).toHaveAttribute('data-contrast', 'high')
  })

  it('restaura as configurações para o padrão', async () => {
    const user = userEvent.setup()
    renderWithProvider(<AccessibilityControl />)

    const grandeButton = screen.getByRole('radio', { name: 'Grande' })
    await user.click(grandeButton)
    expect(document.documentElement).toHaveAttribute('data-font-size', 'large')

    const restoreButton = screen.getByText('Restaurar configurações')
    await user.click(restoreButton)

    expect(document.documentElement).toHaveAttribute('data-font-size', 'normal')
  })

  it('persiste as preferências no localStorage', async () => {
    const user = userEvent.setup()
    renderWithProvider(<AccessibilityControl />)

    const grandeButton = screen.getByRole('radio', { name: 'Grande' })
    await user.click(grandeButton)

    const stored = localStorage.getItem('seniorease-prefs')
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed.fontSize).toBe('large')
  })

  it('navega por teclado nos controles', async () => {
    const user = userEvent.setup()
    renderWithProvider(<AccessibilityControl />)

    const radios = screen.getAllByRole('radio')
    const firstRadio = radios[0]
    firstRadio.focus()

    await user.keyboard('{Enter}')
    expect(firstRadio).toHaveAttribute('aria-checked', 'true')
  })
})
