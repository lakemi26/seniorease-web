import { describe, it, expect } from 'vitest'
import { activityFormSchema } from '../activity.schema'

const validData = {
  title: 'Consulta médica',
  description: '',
  category: 'health' as const,
  date: '2026-12-25',
  hasTime: false,
  time: '14:00',
  priority: 'medium' as const,
  steps: [],
  reminderOption: 'none' as const,
  reminderDate: '',
  reminderTime: '',
  confirmPastDate: false,
}

describe('activityFormSchema', () => {
  it('deve validar dados corretos', () => {
    const result = activityFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('deve rejeitar título vazio', () => {
    const result = activityFormSchema.safeParse({ ...validData, title: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('title')
    }
  })

  it('deve rejeitar título muito curto', () => {
    const result = activityFormSchema.safeParse({ ...validData, title: 'ab' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('title')
    }
  })

  it('deve rejeitar título muito longo', () => {
    const result = activityFormSchema.safeParse({ ...validData, title: 'a'.repeat(101) })
    expect(result.success).toBe(false)
  })

  it('deve remover espaços excedentes do título', () => {
    const result = activityFormSchema.safeParse({ ...validData, title: '  Consulta  ' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.title).toBe('Consulta')
    }
  })

  it('deve rejeitar descrição muito longa', () => {
    const result = activityFormSchema.safeParse({ ...validData, description: 'a'.repeat(501) })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar data vazia', () => {
    const result = activityFormSchema.safeParse({ ...validData, date: '' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar hasTime false sem horário', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      hasTime: false,
      time: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('time')
    }
  })

  it('deve aceitar hasTime true sem horário', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      hasTime: true,
      time: '',
    })
    expect(result.success).toBe(true)
  })

  it('deve rejeitar data no passado sem confirmação', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      date: '2020-01-01',
      time: '10:00',
      confirmPastDate: false,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'))
      expect(paths).toContain('confirmPastDate')
    }
  })

  it('deve aceitar data no passado com confirmação', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      date: '2020-01-01',
      time: '10:00',
      confirmPastDate: true,
    })
    expect(result.success).toBe(true)
  })

  it('deve rejeitar lembrete personalizado sem data', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      reminderOption: 'custom',
      reminderDate: '',
      reminderTime: '10:00',
    })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar lembrete personalizado sem horário', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      reminderOption: 'custom',
      reminderDate: '2026-12-25',
      reminderTime: '',
    })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar lembrete depois da atividade', () => {
    const result = activityFormSchema.safeParse({
      ...validData,
      reminderOption: 'custom',
      reminderDate: '2026-12-26',
      reminderTime: '10:00',
    })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar etapas excedendo o limite', () => {
    const steps = Array.from({ length: 21 }, (_, i) => ({
      _key: `k${i}`,
      title: `Etapa ${i + 1}`,
    }))
    const result = activityFormSchema.safeParse({ ...validData, steps })
    expect(result.success).toBe(false)
  })

  it('deve aceitar etapas dentro do limite', () => {
    const steps = Array.from({ length: 20 }, (_, i) => ({
      _key: `k${i}`,
      title: `Etapa ${i + 1}`,
    }))
    const result = activityFormSchema.safeParse({ ...validData, steps })
    expect(result.success).toBe(true)
  })

  it('deve rejeitar categoria inválida', () => {
    const result = activityFormSchema.safeParse({ ...validData, category: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('deve rejeitar prioridade inválida', () => {
    const result = activityFormSchema.safeParse({ ...validData, priority: 'urgent' })
    expect(result.success).toBe(false)
  })
})
