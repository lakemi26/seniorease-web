import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DashboardSkeleton } from '../components/DashboardSkeleton'

describe('DashboardSkeleton', () => {
  it('renderiza sem erros', () => {
    const { container } = render(<DashboardSkeleton />)
    expect(container).toBeTruthy()
  })

  it('possui aria-hidden="true" para não poluir leitores de tela', () => {
    const { container } = render(<DashboardSkeleton />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.getAttribute('aria-hidden')).toBe('true')
  })
})
