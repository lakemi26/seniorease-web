import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelpContextReturn } from '../components/HelpContextReturn'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('HelpContextReturn', () => {
  it('não renderiza quando não tem origem', () => {
    const { container } = render(<HelpContextReturn origin={null} />)
    expect(container.innerHTML).toBe('')
  })

  it('não renderiza quando origem é inválida', () => {
    const { container } = render(<HelpContextReturn origin="invalida" />)
    expect(container.innerHTML).toBe('')
  })

  it('exibe "Voltar para atividades" quando origem=atividades', () => {
    render(<HelpContextReturn origin="atividades" />)
    expect(screen.getByRole('button', { name: 'Voltar para atividades' })).toBeInTheDocument()
  })

  it('exibe "Voltar para dashboard" quando origem=dashboard', () => {
    render(<HelpContextReturn origin="dashboard" />)
    expect(screen.getByRole('button', { name: 'Voltar para dashboard' })).toBeInTheDocument()
  })

  it('exibe "Voltar para perfil" quando origem=perfil', () => {
    render(<HelpContextReturn origin="perfil" />)
    expect(screen.getByRole('button', { name: 'Voltar para perfil' })).toBeInTheDocument()
  })
})
