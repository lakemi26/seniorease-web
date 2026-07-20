import type { IAuthRepository } from '../domain/repositories'
import type { UserProfile, UserPreferences } from '../domain/entities'

export function createAuthUseCases(repository: IAuthRepository) {
  function signInUser(email: string, password: string, rememberMe: boolean) {
    return repository.signIn(email, password, rememberMe)
  }

  async function signUpUser(email: string, password: string, name: string) {
    const user = await repository.signUp(email, password)
    await repository.updateFirebaseProfile(user, { displayName: name })
    await repository.createUserProfile(user.uid, { name, email })
    await repository.saveUserPreferences(user.uid, {
      fontSize: 'normal',
      contrast: 'default',
      spacing: 'normal',
      interfaceMode: 'basic',
      enhancedFeedback: true,
      confirmCriticalActions: true,
      reduceMotion: false,
      remindersEnabled: true,
      updatedAt: '',
    })
    await repository.sendEmailVerification(user)
    return user
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

  async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    return repository.updateUserProfile(uid, data)
  }

  async function getUserPreferences(uid: string): Promise<UserPreferences | null> {
    return repository.getUserPreferences(uid)
  }

  async function saveUserPreferences(uid: string, preferences: UserPreferences): Promise<void> {
    return repository.saveUserPreferences(uid, preferences)
  }

  return {
    signInUser,
    signUpUser,
    signOutUser,
    sendPasswordReset,
    getAuthenticatedUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    getUserPreferences,
    saveUserPreferences,
  }
}
