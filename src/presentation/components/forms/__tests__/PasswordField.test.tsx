import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PasswordField } from '@/presentation/components/forms/PasswordField'

describe('PasswordField', () => {
  it('deve renderizar campo de senha', () => {
    render(<PasswordField placeholder="Digite sua senha" />)
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument()
  })

  it('deve iniciar com tipo password', () => {
    render(<PasswordField placeholder="Digite sua senha" />)
    const input = screen.getByPlaceholderText('Digite sua senha')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('deve alternar para texto ao clicar em mostrar', () => {
    render(<PasswordField placeholder="Digite sua senha" />)
    const button = screen.getByLabelText('Mostrar senha')
    fireEvent.click(button)
    const input = screen.getByPlaceholderText('Digite sua senha')
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Ocultar senha')).toBeInTheDocument()
  })

  it('deve alternar de volta para password ao clicar em ocultar', () => {
    render(<PasswordField placeholder="Digite sua senha" />)
    const showButton = screen.getByLabelText('Mostrar senha')
    fireEvent.click(showButton)
    const hideButton = screen.getByLabelText('Ocultar senha')
    fireEvent.click(hideButton)
    const input = screen.getByPlaceholderText('Digite sua senha')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('deve aplicar aria-invalid quando hasError é true', () => {
    render(<PasswordField placeholder="Digite sua senha" hasError />)
    const input = screen.getByPlaceholderText('Digite sua senha')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('deve aplicar aria-describedby quando errorId é fornecido', () => {
    render(<PasswordField placeholder="Digite sua senha" hasError errorId="senha-error" />)
    const input = screen.getByPlaceholderText('Digite sua senha')
    expect(input).toHaveAttribute('aria-describedby', 'senha-error')
  })

  it('deve desabilitar o campo quando disabled é true', () => {
    render(<PasswordField placeholder="Digite sua senha" disabled />)
    const input = screen.getByPlaceholderText('Digite sua senha')
    expect(input).toBeDisabled()
  })
})
