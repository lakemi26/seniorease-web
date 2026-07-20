import { describe, it, expect } from 'vitest'
import { cadastroSchema } from '@/modules/authentication/presentation/schemas/cadastro.schema'

const validData = {
  name: 'Maria Silva',
  email: 'maria@exemplo.com',
  password: 'Senha123',
  confirmPassword: 'Senha123',
  terms: true as const,
}

describe('cadastroSchema', () => {
  it('deve validar dados corretos', () => {
    const result = cadastroSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('deve validar nome com espaço extra nas bordas', () => {
    const result = cadastroSchema.safeParse({
      ...validData,
      name: '  João  ',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('João')
    }
  })

  it('deve rejeitar nome vazio', () => {
    const result = cadastroSchema.safeParse({ ...validData, name: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('name')
    }
  })

  it('deve rejeitar nome com menos de 2 caracteres', () => {
    const result = cadastroSchema.safeParse({ ...validData, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar e-mail vazio', () => {
    const result = cadastroSchema.safeParse({ ...validData, email: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })

  it('deve rejeitar e-mail inválido', () => {
    const result = cadastroSchema.safeParse({ ...validData, email: 'invalido' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha vazia', () => {
    const result = cadastroSchema.safeParse({ ...validData, password: '' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha com menos de 8 caracteres', () => {
    const result = cadastroSchema.safeParse({ ...validData, password: 'Abc123' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha sem letra', () => {
    const result = cadastroSchema.safeParse({ ...validData, password: '12345678' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha sem número', () => {
    const result = cadastroSchema.safeParse({ ...validData, password: 'abcdefgh' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar confirmação diferente da senha', () => {
    const result = cadastroSchema.safeParse({
      ...validData,
      confirmPassword: 'Outra123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirmPassword')
    }
  })

  it('deve rejeitar confirmação vazia', () => {
    const result = cadastroSchema.safeParse({ ...validData, confirmPassword: '' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar termos não aceitos', () => {
    const result = cadastroSchema.safeParse({ ...validData, terms: false })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('terms')
    }
  })
})
