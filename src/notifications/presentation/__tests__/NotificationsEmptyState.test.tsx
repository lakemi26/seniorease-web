import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotificationsEmptyState } from '../components/NotificationsEmptyState'

describe('NotificationsEmptyState', () => {
  it('exibe mensagem de nenhuma notificação', () => {
    render(<NotificationsEmptyState />)
    expect(screen.getByText('Nenhuma notificação no momento.')).toBeDefined()
  })
})
