import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContextualHelpLink } from '../components/ContextualHelpLink'

describe('ContextualHelpLink', () => {
  it('exibe label padrão', () => {
    render(<ContextualHelpLink />)
    expect(screen.getByRole('button', { name: 'Preciso de ajuda' })).toBeInTheDocument()
  })

  it('exibe label personalizado', () => {
    render(<ContextualHelpLink label="Ajuda com isso" />)
    expect(screen.getByRole('button', { name: 'Ajuda com isso' })).toBeInTheDocument()
  })

  it('possui ícone', () => {
    render(<ContextualHelpLink />)
    const button = screen.getByRole('button', { name: 'Preciso de ajuda' })
    expect(button).toBeInTheDocument()
  })
})
