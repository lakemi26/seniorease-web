import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotificationsFilters } from '../components/NotificationsFilters'

describe('NotificationsFilters', () => {
  it('exibe botões de filtro', () => {
    const onChange = vi.fn()
    render(<NotificationsFilters active="all" onChange={onChange} isComplete={true} />)
    expect(screen.getByText('Todas')).toBeDefined()
    expect(screen.getByText('Não lidas')).toBeDefined()
    expect(screen.getByText('Próximas')).toBeDefined()
  })

  it('destaca o filtro ativo', () => {
    const onChange = vi.fn()
    render(<NotificationsFilters active="unread" onChange={onChange} isComplete={true} />)
    const unreadBtn = screen.getByText('Não lidas')
    expect(unreadBtn.getAttribute('aria-pressed')).toBe('true')
  })

  it('chama onChange ao clicar em um filtro', () => {
    const onChange = vi.fn()
    render(<NotificationsFilters active="all" onChange={onChange} isComplete={true} />)
    screen.getByText('Próximas').click()
    expect(onChange).toHaveBeenCalledWith('upcoming')
  })
})
