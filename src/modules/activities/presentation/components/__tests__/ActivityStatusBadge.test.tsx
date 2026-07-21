import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityStatusBadge } from '../ActivityStatusBadge'

describe('ActivityStatusBadge', () => {
  it('exibe "A fazer" para status pending', () => {
    render(<ActivityStatusBadge status="pending" />)
    expect(screen.getByText('A fazer')).toBeInTheDocument()
  })

  it('exibe "Em andamento" para status inProgress', () => {
    render(<ActivityStatusBadge status="inProgress" />)
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
  })

  it('exibe "Concluída" para status completed', () => {
    render(<ActivityStatusBadge status="completed" />)
    expect(screen.getByText('Concluída')).toBeInTheDocument()
  })

  it('exibe "Atrasada" quando isDelayed é true e status pending', () => {
    render(<ActivityStatusBadge status="pending" isDelayed />)
    expect(screen.getByText('Atrasada')).toBeInTheDocument()
  })

  it('não exibe "Atrasada" quando status não é pending', () => {
    render(<ActivityStatusBadge status="inProgress" isDelayed />)
    expect(screen.getByText('Em andamento')).toBeInTheDocument()
    expect(screen.queryByText('Atrasada')).not.toBeInTheDocument()
  })

  it('exibe "Cancelada" para status cancelled', () => {
    render(<ActivityStatusBadge status="cancelled" />)
    expect(screen.getByText('Cancelada')).toBeInTheDocument()
  })
})
