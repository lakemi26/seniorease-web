import type { IOnboardingRepository } from '../domain/repositories'
import type { OnboardingPreferences } from '../domain/entities'

export function createOnboardingUseCases(repository: IOnboardingRepository) {
  async function saveOnboardingProgress(uid: string, step: number, preferences: OnboardingPreferences) {
    return repository.saveProgress(uid, step, preferences)
  }

  async function completeFirstAccess(uid: string, preferences: OnboardingPreferences) {
    return repository.completeOnboarding(uid, preferences)
  }

  return {
    saveOnboardingProgress,
    completeFirstAccess,
  }
}
