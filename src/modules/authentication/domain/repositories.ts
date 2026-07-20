import type { User } from 'firebase/auth'
import type { UserProfile, UserPreferences } from './entities'

export interface IAuthRepository {
  signIn(email: string, password: string, rememberMe: boolean): Promise<User>
  signUp(email: string, password: string): Promise<User>
  signOut(): Promise<void>
  sendPasswordReset(email: string): Promise<void>
  sendEmailVerification(user: User): Promise<void>
  reloadUser(user: User): Promise<void>
  updateFirebaseProfile(user: User, data: { displayName?: string }): Promise<void>
  getCurrentUser(): User | null
  onAuthStateChanged(callback: (user: User | null) => void): () => void

  getUserProfile(uid: string): Promise<UserProfile | null>
  createUserProfile(uid: string, data: { name: string; email: string }): Promise<void>
  updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void>

  getUserPreferences(uid: string): Promise<UserPreferences | null>
  saveUserPreferences(uid: string, preferences: UserPreferences): Promise<void>
}
