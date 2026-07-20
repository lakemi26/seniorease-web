import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  type User,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { getFirebaseAuth } from '@/infrastructure/firebase/firebase.auth'
import { getFirebaseFirestore } from '@/infrastructure/firebase/firebase.firestore'
import type { IAuthRepository } from '../domain/repositories'
import type { UserProfile, UserPreferences } from '../domain/entities'

export function createFirebaseAuthRepository(): IAuthRepository {
  function getAuth() {
    return getFirebaseAuth()
  }

  function getDb() {
    return getFirebaseFirestore()
  }

  async function signIn(email: string, password: string, rememberMe: boolean): Promise<User> {
    const auth = getAuth()
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  }

  async function signOut(): Promise<void> {
    return firebaseSignOut(getAuth())
  }

  async function sendPasswordReset(email: string): Promise<void> {
    return sendPasswordResetEmail(getAuth(), email)
  }

  function getCurrentUser(): User | null {
    return getAuth().currentUser
  }

  function onAuthStateChangedHandler(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(getAuth(), callback)
  }

  async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const db = getDb()
    const docRef = doc(db, 'users', uid)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) return null
    return snapshot.data() as UserProfile
  }

  async function createUserProfile(
    uid: string,
    data: { name: string; email: string }
  ): Promise<void> {
    const db = getDb()
    const docRef = doc(db, 'users', uid)
    const profile: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      firstAccessCompleted: false,
      onboardingStep: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    await setDoc(docRef, profile)
  }

  async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    const db = getDb()
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  }

  async function getUserPreferences(uid: string): Promise<UserPreferences | null> {
    const db = getDb()
    const docRef = doc(db, 'userPreferences', uid)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) return null
    return snapshot.data() as UserPreferences
  }

  async function saveUserPreferences(uid: string, preferences: UserPreferences): Promise<void> {
    const db = getDb()
    const docRef = doc(db, 'userPreferences', uid)
    await setDoc(docRef, {
      ...preferences,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  }

  return {
    signIn,
    signOut,
    sendPasswordReset,
    getCurrentUser,
    onAuthStateChanged: onAuthStateChangedHandler,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    getUserPreferences,
    saveUserPreferences,
  }
}
