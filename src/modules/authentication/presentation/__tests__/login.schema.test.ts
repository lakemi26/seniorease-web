import { describe, it, expect } from 'vitest'
import { loginSchema } from '@/modules/authentication/presentation/schemas/login.schema'

describe('loginSchema', () => {
  it('deve validar dados corretos', () => {
    const result = loginSchema.safeParse({
      email: 'usuario@exemplo.com',
      password: '123456',
      rememberMe: true,
    })
    expect(result.success).toBe(true)
  })

  it('deve rejeitar e-mail vazio', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: '123456',
      rememberMe: false,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })

  it('deve rejeitar e-mail inválido', () => {
    const result = loginSchema.safeParse({
      email: 'invalido',
      password: '123456',
      rememberMe: false,
    })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha vazia', () => {
    const result = loginSchema.safeParse({
      email: 'usuario@exemplo.com',
      password: '',
      rememberMe: false,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('password')
    }
  })

  it('deve rejeitar senha com menos de 6 caracteres', () => {
    const result = loginSchema.safeParse({
      email: 'usuario@exemplo.com',
      password: '12345',
      rememberMe: false,
    })
    expect(result.success).toBe(false)
  })

  it('rememberMe deve ser false por padrão', () => {
    const result = loginSchema.parse({
      email: 'usuario@exemplo.com',
      password: '123456',
    })
    expect(result.rememberMe).toBe(false)
  })
})
