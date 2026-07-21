import { describe, it, expect } from 'vitest'
import { profileSchema } from '@/modules/authentication/presentation/schemas/profile.schema'

describe('profileSchema', () => {
  it('deve validar nome correto', () => {
    const result = profileSchema.safeParse({ name: 'Maria Silva' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Maria Silva')
    }
  })

  it('deve remover espaços das bordas', () => {
    const result = profileSchema.safeParse({ name: '  João  ' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('João')
    }
  })

  it('deve reduzir espaços internos repetidos', () => {
    const result = profileSchema.safeParse({ name: 'Maria   Silva' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Maria Silva')
    }
  })

  it('deve rejeitar nome vazio', () => {
    const result = profileSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar apenas espaços', () => {
    const result = profileSchema.safeParse({ name: '   ' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar nome com menos de 2 caracteres', () => {
    const result = profileSchema.safeParse({ name: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Use pelo menos 2 caracteres.')
    }
  })

  it('deve rejeitar nome com mais de 80 caracteres', () => {
    const result = profileSchema.safeParse({ name: 'A'.repeat(81) })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('O nome deve ter no máximo 80 caracteres.')
    }
  })

  it('deve aceitar nome com exatamente 80 caracteres', () => {
    const result = profileSchema.safeParse({ name: 'A'.repeat(80) })
    expect(result.success).toBe(true)
  })
})
