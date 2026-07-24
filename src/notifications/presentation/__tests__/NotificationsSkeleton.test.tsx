import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { NotificationsSkeleton } from '../components/NotificationsSkeleton'

describe('NotificationsSkeleton', () => {
  it('renderiza sem erros', () => {
    const { container } = render(<NotificationsSkeleton />)
    expect(container).toBeTruthy()
  })

  it('possui role="status" para acessibilidade', () => {
    const { getByRole } = render(<NotificationsSkeleton />)
    expect(getByRole('status')).toBeDefined()
  })
})
