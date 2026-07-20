import type { IAuthRepository } from '../domain/repositories'
import type { UserProfile, UserPreferences } from '../domain/entities'

export function createAuthUseCases(repository: IAuthRepository) {
  async function signInUser(email: string, password: string, rememberMe: boolean) {
    return repository.signIn(email, password, rememberMe)
  }

  function signOutUser() {
    return repository.signOut()
  }

  function sendPasswordReset(email: string) {
    return repository.sendPasswordReset(email)
  }

  function getAuthenticatedUser() {
    return repository.getCurrentUser()
  }

  async function getUserProfile(uid: string): Promise<UserProfile | null> {
    return repository.getUserProfile(uid)
  }

  async function createUserProfile(uid: string, data: { name: string; email: string }): Promise<void> {
    return repository.createUserProfile(uid, data)
  }

  async function getUserPreferences(uid: string): Promise<UserPreferences | null> {
    return repository.getUserPreferences(uid)
  }

  async function saveUserPreferences(uid: string, preferences: UserPreferences): Promise<void> {
    return repository.saveUserPreferences(uid, preferences)
  }

  return {
    signInUser,
    signOutUser,
    sendPasswordReset,
    getAuthenticatedUser,
    getUserProfile,
    createUserProfile,
    getUserPreferences,
    saveUserPreferences,
  }
}
