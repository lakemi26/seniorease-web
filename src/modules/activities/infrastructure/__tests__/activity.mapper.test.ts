import { describe, it, expect } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { mapActivityDocument, mapActivityDocuments, toFirestoreCreateDocument } from '../mappers/activity.mapper'
import type { ActivityDocument } from '../mappers/types'
import type { CreateActivityInput } from '../../domain/entities'

function makeDoc(overrides?: Partial<ActivityDocument>): ActivityDocument {
  const now = Timestamp.now()
  return {
    id: 'act-1',
    userId: 'user-1',
    title: 'Teste',
    description: null,
    category: 'health',
    scheduledAt: now,
    hasTime: true,
    status: 'pending',
    priority: 'medium',
    steps: [],
    reminder: { enabled: false, remindAt: null },
    startedAt: null,
    completedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

describe('mapActivityDocument', () => {
  it('converte Timestamp para Date', () => {
    const doc = makeDoc()
    const result = mapActivityDocument(doc)

    expect(result.createdAt).toBeInstanceOf(Date)
    expect(result.updatedAt).toBeInstanceOf(Date)
    expect(result.scheduledAt).toBeInstanceOf(Date)
  })

  it('preserva campos não temporais', () => {
    const doc = makeDoc({ title: 'Consulta médica', category: 'health' })
    const result = mapActivityDocument(doc)
    expect(result.title).toBe('Consulta médica')
    expect(result.category).toBe('health')
    expect(result.status).toBe('pending')
    expect(result.hasTime).toBe(true)
    expect(result.reminder.enabled).toBe(false)
    expect(result.reminder.remindAt).toBeNull()
  })

  it('converte steps.completedAt de Timestamp para Date', () => {
    const stepTime = Timestamp.fromDate(new Date('2026-07-20T10:00:00'))
    const doc = makeDoc({
      steps: [{ id: 's1', title: 'Passo 1', order: 1, completed: true, completedAt: stepTime }],
    })
    const result = mapActivityDocument(doc)
    expect(result.steps[0].completedAt).toBeInstanceOf(Date)
    expect(result.steps[0].completedAt!.getTime()).toBe(new Date('2026-07-20T10:00:00').getTime())
  })

  it('converte reminder.remindAt null para null', () => {
    const doc = makeDoc({ reminder: { enabled: false, remindAt: null } })
    const result = mapActivityDocument(doc)
    expect(result.reminder.remindAt).toBeNull()
  })
})

describe('mapActivityDocuments', () => {
  it('mapeia uma lista de documentos', () => {
    const docs = [makeDoc({ id: '1' }), makeDoc({ id: '2' })]
    const results = mapActivityDocuments(docs)
    expect(results).toHaveLength(2)
    expect(results[0].id).toBe('1')
    expect(results[1].id).toBe('2')
  })
})

describe('toFirestoreCreateDocument', () => {
  it('converte CreateActivityInput para CreateActivityDocument', () => {
    const input: CreateActivityInput = {
      userId: 'user-1',
      title: 'Nova atividade',
      description: 'Descrição',
      category: 'health',
      scheduledAt: new Date('2026-07-20T14:00:00'),
      hasTime: true,
      priority: 'high',
      steps: [{ id: 's1', title: 'Passo 1', order: 1 }],
      reminder: { enabled: true, remindAt: new Date('2026-07-20T13:00:00') },
    }

    const doc = toFirestoreCreateDocument(input)

    expect(doc.userId).toBe('user-1')
    expect(doc.title).toBe('Nova atividade')
    expect(doc.status).toBe('pending')
    expect(doc.steps).toHaveLength(1)
    expect(doc.steps[0].completed).toBe(false)
    expect(doc.steps[0].completedAt).toBeNull()
    expect(doc.reminder.enabled).toBe(true)
    expect(doc.startedAt).toBeNull()
    expect(doc.completedAt).toBeNull()
    expect(doc.createdAt).toBeDefined()
    expect(doc.updatedAt).toBeDefined()
  })
})
