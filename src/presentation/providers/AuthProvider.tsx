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
  updateProfileState: (profile: UserProfile) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
  updateProfileState: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)
  const [isProfileLoaded, setIsProfileLoaded] = useState(false)

  const isLoading = isFirebaseConfigured()
    ? !isAuthInitialized || (!!user && !isProfileLoaded)
    : false

  const updateProfileState = useCallback((updatedProfile: UserProfile) => {
    setProfile(updatedProfile)
  }, [])

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return
    }

    const repository = createFirebaseAuthRepository()

    const unsubscribe = repository.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      if (!firebaseUser) {
        setProfile(null)
        setIsProfileLoaded(false)
      }
      setIsAuthInitialized(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!user) {
      return
    }

    const repository = createFirebaseAuthRepository()
    const useCases = createAuthUseCases(repository)

    const unsub = useCases.subscribeToUserProfile(
      user.uid,
      (data) => {
        setProfile(data)
        setIsProfileLoaded(true)
      },
      () => {
        setProfile(null)
        setIsProfileLoaded(true)
      },
    )

    return () => {
      unsub()
    }
  }, [user])

  const refreshProfile = useCallback(async () => {}, [])

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
      updateProfileState,
    }),
    [user, profile, isLoading, signOut, refreshProfile, updateProfileState]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
