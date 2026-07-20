import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxField } from '@/presentation/components/forms/CheckboxField'

describe('CheckboxField', () => {
  it('deve renderizar com label', () => {
    render(<CheckboxField label="Continuar conectado" />)
    expect(screen.getByLabelText('Continuar conectado')).toBeInTheDocument()
  })

  it('deve chamar onChange ao clicar', () => {
    const onChange = vi.fn()
    render(<CheckboxField label="Continuar conectado" onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Continuar conectado'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('deve iniciar desmarcado por padrão', () => {
    render(<CheckboxField label="Continuar conectado" />)
    const checkbox = screen.getByLabelText('Continuar conectado') as HTMLInputElement
    expect(checkbox.checked).toBe(false)
  })

  it('deve iniciar marcado quando checked é true', () => {
    render(<CheckboxField label="Continuar conectado" checked />)
    const checkbox = screen.getByLabelText('Continuar conectado') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('deve exibir descrição quando fornecida', () => {
    render(
      <CheckboxField
        label="Continuar conectado"
        description="Mantenha sua sessão ativa."
      />
    )
    expect(screen.getByText('Mantenha sua sessão ativa.')).toBeInTheDocument()
  })
})
