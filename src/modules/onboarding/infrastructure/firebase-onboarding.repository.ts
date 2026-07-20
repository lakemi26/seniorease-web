import { doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getFirebaseFirestore } from '@/infrastructure/firebase/firebase.firestore'
import type { IOnboardingRepository } from '../domain/repositories'
import type { OnboardingPreferences } from '../domain/entities'

export function createFirebaseOnboardingRepository(): IOnboardingRepository {
  function getDb() {
    return getFirebaseFirestore()
  }

  async function saveProgress(uid: string, step: number, preferences: OnboardingPreferences): Promise<void> {
    const db = getDb()
    const userRef = doc(db, 'users', uid)
    const prefsRef = doc(db, 'userPreferences', uid)

    await Promise.all([
      updateDoc(userRef, {
        onboardingStep: step,
        updatedAt: serverTimestamp(),
      }),
      setDoc(prefsRef, {
        ...preferences,
        updatedAt: serverTimestamp(),
      }, { merge: true }),
    ])
  }

  async function completeOnboarding(uid: string, preferences: OnboardingPreferences): Promise<void> {
    const db = getDb()
    const userRef = doc(db, 'users', uid)
    const prefsRef = doc(db, 'userPreferences', uid)

    await Promise.all([
      updateDoc(userRef, {
        firstAccessCompleted: true,
        onboardingStep: 6,
        updatedAt: serverTimestamp(),
      }),
      setDoc(prefsRef, {
        ...preferences,
        updatedAt: serverTimestamp(),
      }, { merge: true }),
    ])
  }

  return {
    saveProgress,
    completeOnboarding,
  }
}
