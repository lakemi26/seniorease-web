import { describe, it, expect } from 'vitest'
import { passwordRecoverySchema } from '@/modules/authentication/presentation/schemas/password-recovery.schema'

describe('passwordRecoverySchema', () => {
  it('deve validar e-mail correto', () => {
    const result = passwordRecoverySchema.safeParse({ email: 'usuario@exemplo.com' })
    expect(result.success).toBe(true)
  })

  it('deve rejeitar e-mail vazio', () => {
    const result = passwordRecoverySchema.safeParse({ email: '' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar e-mail inválido', () => {
    const result = passwordRecoverySchema.safeParse({ email: 'invalido' })
    expect(result.success).toBe(false)
  })
})
