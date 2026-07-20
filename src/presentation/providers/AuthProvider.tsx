'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { User } from 'firebase/auth'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { isFirebaseConfigured } from '@/infrastructure/firebase/firebase.config'
import type { UserProfile } from '@/modules/authentication/domain/entities'

let authUseCasesSingleton: ReturnType<typeof createAuthUseCases> | null = null

function getAuthUseCases() {
  if (!authUseCasesSingleton) {
    const repository = createFirebaseAuthRepository()
    authUseCasesSingleton = createAuthUseCases(repository)
  }
  return authUseCasesSingleton
}

export interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)
  const isLoading = isFirebaseConfigured() ? !isAuthInitialized : false

  const loadProfile = useCallback(async (uid: string) => {
    try {
      const userProfile = await getAuthUseCases().getUserProfile(uid)
      setProfile(userProfile)
    } catch {
      setProfile(null)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    await loadProfile(user.uid)
  }, [user, loadProfile])

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return
    }

    const repository = createFirebaseAuthRepository()

    const unsubscribe = repository.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await loadProfile(firebaseUser.uid)
      } else {
        setProfile(null)
      }
      setIsAuthInitialized(true)
    })

    return () => {
      unsubscribe()
    }
  }, [loadProfile])

  const signOut = useCallback(async () => {
    await getAuthUseCases().signOutUser()
    setUser(null)
    setProfile(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      profile,
      isAuthenticated: !!user,
      isLoading,
      signOut,
      refreshProfile,
    }),
    [user, profile, isLoading, signOut, refreshProfile]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
