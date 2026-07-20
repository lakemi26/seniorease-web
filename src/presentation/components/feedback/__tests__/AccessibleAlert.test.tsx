import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'

describe('AccessibleAlert', () => {
  it('deve renderizar mensagem de erro', () => {
    render(<AccessibleAlert variant="error" message="Erro de teste" />)
    expect(screen.getByText('Erro de teste')).toBeInTheDocument()
  })

  it('deve ter role="alert"', () => {
    render(<AccessibleAlert variant="error" message="Alerta" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('não deve renderizar quando message é vazio', () => {
    const { container } = render(<AccessibleAlert variant="error" message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('deve chamar onClose ao clicar no botão fechar', () => {
    const onClose = vi.fn()
    render(<AccessibleAlert variant="info" message="Mensagem" onClose={onClose} />)
    const closeButton = screen.getByLabelText('Fechar mensagem')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })
})
