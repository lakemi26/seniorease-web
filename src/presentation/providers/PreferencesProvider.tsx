'use client'

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { UserPreferences } from '@/modules/authentication/domain/entities'
import { DEFAULT_USER_PREFERENCES } from '@/modules/authentication/domain/entities'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { useAuth } from '@/presentation/hooks/useAuth'

export function mapToDataAttributes(prefs: UserPreferences) {
  const fontSizeMap: Record<string, string> = {
    normal: 'normal',
    large: 'large',
    extraLarge: 'x-large',
  }
  const contrastMap: Record<string, string> = {
    default: 'normal',
    high: 'high',
    dark: 'dark',
  }
  const spacingMap: Record<string, string> = {
    normal: 'normal',
    expanded: 'wide',
  }
  return {
    'data-font-size': fontSizeMap[prefs.fontSize] || 'normal',
    'data-contrast': contrastMap[prefs.contrast] || 'normal',
    'data-spacing': spacingMap[prefs.spacing] || 'normal',
    'data-interface': prefs.interfaceMode,
    'data-enhanced-feedback': prefs.enhancedFeedback ? 'true' : 'false',
    'data-reminders-enabled': prefs.remindersEnabled ? 'true' : 'false',
    'data-motion': prefs.reduceMotion ? 'reduced' : 'normal',
  }
}

function applyDataAttributes(prefs: UserPreferences) {
  const attrs = mapToDataAttributes(prefs)
  const root = document.documentElement
  for (const [key, value] of Object.entries(attrs)) {
    root.setAttribute(key, value)
  }
}

export interface PreferencesContextType {
  preferences: UserPreferences
  isLoading: boolean
  error: string | null
  updatePreferences: (prefs: UserPreferences) => Promise<void>
  resetPreferences: () => Promise<void>
  refreshPreferences: () => void
}

export const PreferencesContext = createContext<PreferencesContextType>({
  preferences: DEFAULT_USER_PREFERENCES,
  isLoading: true,
  error: null,
  updatePreferences: async () => {},
  resetPreferences: async () => {},
  refreshPreferences: () => {},
})

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_USER_PREFERENCES)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current()
      unsubscribeRef.current = null
    }

    if (!user) {
      applyDataAttributes(DEFAULT_USER_PREFERENCES)
      return
    }

    const repository = createFirebaseAuthRepository()
    const useCases = createAuthUseCases(repository)

    const unsub = useCases.subscribeToUserPreferences(
      user.uid,
      (data) => {
        if (data) {
          setPreferences(data)
          applyDataAttributes(data)
        } else {
          setPreferences(DEFAULT_USER_PREFERENCES)
          applyDataAttributes(DEFAULT_USER_PREFERENCES)
        }
        setIsLoading(false)
      },
      () => {
        setError('Não foi possível carregar suas preferências.')
        setIsLoading(false)
      },
    )
    unsubscribeRef.current = unsub

    return () => {
      unsub()
      unsubscribeRef.current = null
    }
  }, [user])

  const updatePreferences = useCallback(async (prefs: UserPreferences) => {
    if (!user) return
    setError(null)
    try {
      const repository = createFirebaseAuthRepository()
      const useCases = createAuthUseCases(repository)
      await useCases.saveUserPreferences(user.uid, prefs)
    } catch {
      setError('Não foi possível salvar suas preferências. Verifique sua conexão e tente novamente.')
      throw new Error('save failed')
    }
  }, [user])

  const resetPreferences = useCallback(async () => {
    if (!user) return
    setError(null)
    try {
      const repository = createFirebaseAuthRepository()
      const useCases = createAuthUseCases(repository)
      await useCases.resetUserPreferences(user.uid)
    } catch {
      setError('Não foi possível restaurar as configurações. Verifique sua conexão e tente novamente.')
      throw new Error('reset failed')
    }
  }, [user])

  const refreshPreferences = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current()
      unsubscribeRef.current = null
    }
    if (!user) return
    setIsLoading(true)
    setError(null)
    const repository = createFirebaseAuthRepository()
    const useCases = createAuthUseCases(repository)
    const unsub = useCases.subscribeToUserPreferences(
      user.uid,
      (data) => {
        if (data) {
          setPreferences(data)
          applyDataAttributes(data)
        } else {
          setPreferences(DEFAULT_USER_PREFERENCES)
          applyDataAttributes(DEFAULT_USER_PREFERENCES)
        }
        setIsLoading(false)
      },
      () => {
        setError('Não foi possível carregar suas preferências.')
        setIsLoading(false)
      },
    )
    unsubscribeRef.current = unsub
  }, [user])

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        isLoading,
        error,
        updatePreferences,
        resetPreferences,
        refreshPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}
