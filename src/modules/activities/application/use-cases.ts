import type { IActivityRepository, ActivityFilters, Unsubscribe } from '../domain/repositories'
import type { Activity, CreateActivityInput, WeeklySummary } from '../domain/entities'

export class ActivityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ActivityError'
  }
}

export class PastDateError extends ActivityError {
  constructor() {
    super('A data escolhida já passou.')
    this.name = 'PastDateError'
  }
}

export class ReminderAfterActivityError extends ActivityError {
  constructor() {
    super('O lembrete não pode acontecer depois da atividade.')
    this.name = 'ReminderAfterActivityError'
  }
}

export class EmptyStepError extends ActivityError {
  constructor() {
    super('Cada etapa deve possuir um título.')
    this.name = 'EmptyStepError'
  }
}

export class TooManyStepsError extends ActivityError {
  constructor() {
    super('A atividade pode ter no máximo 20 etapas.')
    this.name = 'TooManyStepsError'
  }
}

export function createActivityUseCases(repository: IActivityRepository) {
  async function createActivity(input: CreateActivityInput): Promise<Activity> {
    if (!input.userId) {
      throw new ActivityError('Usuário não identificado.')
    }

    if (input.steps.length > 20) {
      throw new TooManyStepsError()
    }

    for (const step of input.steps) {
      if (!step.title.trim()) {
        throw new EmptyStepError()
      }
    }

    if (
      input.reminder.enabled &&
      input.reminder.remindAt &&
      input.scheduledAt &&
      input.reminder.remindAt > input.scheduledAt
    ) {
      throw new ReminderAfterActivityError()
    }

    const normalized: CreateActivityInput = {
      ...input,
      title: input.title.trim(),
      description: input.description?.trim() ?? null,
    }

    return repository.create(normalized)
  }

  function subscribeByUser(
    uid: string,
    filters: ActivityFilters,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    return repository.subscribeByUser(uid, filters, onData, onError)
  }

  function subscribeToNextActivity(
    uid: string,
    onData: (activity: Activity | null) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    return repository.subscribeToNextActivity(uid, onData, onError)
  }

  function subscribeToTodayActivities(
    uid: string,
    startOfDay: Date,
    endOfDay: Date,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    return repository.subscribeToTodayActivities(uid, startOfDay, endOfDay, onData, onError)
  }

  function subscribeToInProgressActivities(
    uid: string,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    return repository.subscribeToInProgressActivities(uid, onData, onError)
  }

  function subscribeToRecentCompletedActivities(
    uid: string,
    onData: (activities: Activity[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    return repository.subscribeToRecentCompletedActivities(uid, onData, onError)
  }

  function getWeeklySummary(uid: string): Promise<WeeklySummary> {
    return repository.getWeeklySummary(uid)
  }

  return {
    createActivity,
    subscribeByUser,
    subscribeToNextActivity,
    subscribeToTodayActivities,
    subscribeToInProgressActivities,
    subscribeToRecentCompletedActivities,
    getWeeklySummary,
  }
}
