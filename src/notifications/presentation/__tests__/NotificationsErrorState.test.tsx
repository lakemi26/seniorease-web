import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotificationsErrorState } from '../components/NotificationsErrorState'

describe('NotificationsErrorState', () => {
  it('exibe mensagem de erro e botão de retry', () => {
    const onRetry = vi.fn()
    render(<NotificationsErrorState onRetry={onRetry} />)
    expect(screen.getByText('Não foi possível carregar as notificações.')).toBeDefined()
    expect(screen.getByText('Tentar novamente')).toBeDefined()
  })

  it('chama onRetry ao clicar no botão', () => {
    const onRetry = vi.fn()
    render(<NotificationsErrorState onRetry={onRetry} />)
    screen.getByText('Tentar novamente').click()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
