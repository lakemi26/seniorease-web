import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelpSearch } from '../components/HelpSearch'

describe('HelpSearch', () => {
  it('exibe campo de busca com placeholder', () => {
    render(<HelpSearch value="" onChange={() => {}} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Exemplo: como criar uma atividade')).toBeInTheDocument()
  })

  it('exibe botão de limpar quando tem valor', () => {
    render(<HelpSearch value="teste" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Limpar busca' })).toBeInTheDocument()
  })

  it('não exibe botão de limpar quando está vazio', () => {
    render(<HelpSearch value="" onChange={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Limpar busca' })).not.toBeInTheDocument()
  })

  it('limpa ao clicar no botão de limpar', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<HelpSearch value="teste" onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }))
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('tem label acessível', () => {
    render(<HelpSearch value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Buscar uma orientação')).toBeInTheDocument()
  })
})
