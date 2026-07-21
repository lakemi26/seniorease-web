import { serverTimestamp, Timestamp } from 'firebase/firestore'
import type { Activity, CreateActivityInput } from '../../domain/entities'
import type { ActivityDocument, CreateActivityDocument, StepDocument } from './types'

export function mapActivityDocument(doc: ActivityDocument): Activity {
  return {
    id: doc.id,
    userId: doc.userId,
    title: doc.title,
    description: doc.description,
    category: doc.category,
    scheduledAt: doc.scheduledAt.toDate(),
    hasTime: doc.hasTime,
    status: doc.status,
    priority: doc.priority,
    steps: doc.steps.map((s: StepDocument) => ({
      id: s.id,
      title: s.title,
      order: s.order,
      completed: s.completed,
      completedAt: s.completedAt instanceof Timestamp ? s.completedAt.toDate() : null,
    })),
    reminder: {
      enabled: doc.reminder.enabled,
      remindAt: doc.reminder.remindAt instanceof Timestamp ? doc.reminder.remindAt.toDate() : null,
    },
    startedAt: doc.startedAt instanceof Timestamp ? doc.startedAt.toDate() : null,
    completedAt: doc.completedAt instanceof Timestamp ? doc.completedAt.toDate() : null,
    createdAt: doc.createdAt instanceof Timestamp ? doc.createdAt.toDate() : new Date(),
    updatedAt: doc.updatedAt instanceof Timestamp ? doc.updatedAt.toDate() : new Date(),
  }
}

export function mapActivityDocuments(docs: ActivityDocument[]): Activity[] {
  return docs.map(mapActivityDocument)
}

export function toFirestoreCreateDocument(input: CreateActivityInput): CreateActivityDocument {
  return {
    userId: input.userId,
    title: input.title,
    description: input.description ?? null,
    category: input.category,
    scheduledAt: input.scheduledAt as unknown as Timestamp,
    hasTime: input.hasTime,
    status: 'pending',
    priority: input.priority,
    steps: input.steps.map((s) => ({
      id: s.id,
      title: s.title,
      order: s.order,
      completed: false as const,
      completedAt: null,
    })),
    reminder: {
      enabled: input.reminder.enabled,
      remindAt: input.reminder.remindAt
        ? (input.reminder.remindAt as unknown as Timestamp)
        : null,
    },
    startedAt: null,
    completedAt: null,
    createdAt: serverTimestamp() as unknown,
    updatedAt: serverTimestamp() as unknown,
  }
}
