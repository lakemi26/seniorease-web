'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import type { AccessibilityPreferences, FontSize, ContrastMode, SpacingMode, InterfaceMode, MotionMode } from '@/shared/types'
import { DEMO_PREFERENCES_KEY } from '@/shared/constants'

export interface AccessibilityContextType extends AccessibilityPreferences {
  setFontSize: (value: FontSize) => void
  setContrast: (value: ContrastMode) => void
  setSpacing: (value: SpacingMode) => void
  setInterface: (value: InterfaceMode) => void
  setMotion: (value: MotionMode) => void
  resetPreferences: () => void
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  fontSize: 'normal',
  contrast: 'normal',
  spacing: 'normal',
  interface: 'complete',
  motion: 'normal',
}

export const AccessibilityContext = createContext<AccessibilityContextType>({
  ...DEFAULT_PREFERENCES,
  setFontSize: () => {},
  setContrast: () => {},
  setSpacing: () => {},
  setInterface: () => {},
  setMotion: () => {},
  resetPreferences: () => {},
})

function loadFromStorage(): AccessibilityPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES
  try {
    const stored = localStorage.getItem(DEMO_PREFERENCES_KEY)
    if (stored) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) }
    }
  } catch {
    // ignore
  }
  return DEFAULT_PREFERENCES
}

function applyDataAttributes(prefs: AccessibilityPreferences) {
  const root = document.documentElement
  root.setAttribute('data-font-size', prefs.fontSize)
  root.setAttribute('data-contrast', prefs.contrast)
  root.setAttribute('data-spacing', prefs.spacing)
  root.setAttribute('data-interface', prefs.interface)
  root.setAttribute('data-motion', prefs.motion)
}

function savePreferences(prefs: AccessibilityPreferences) {
  try {
    localStorage.setItem(DEMO_PREFERENCES_KEY, JSON.stringify(prefs))
  } catch {
    // ignore
  }
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const loaded = loadFromStorage()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferences(loaded)
    applyDataAttributes(loaded)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyDataAttributes(preferences)
    savePreferences(preferences)
  }, [preferences, mounted])

  const updateField = useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }, [])

  const setFontSize = useCallback((value: FontSize) => updateField('fontSize', value), [updateField])
  const setContrast = useCallback((value: ContrastMode) => updateField('contrast', value), [updateField])
  const setSpacing = useCallback((value: SpacingMode) => updateField('spacing', value), [updateField])
  const setInterface = useCallback((value: InterfaceMode) => updateField('interface', value), [updateField])
  const setMotion = useCallback((value: MotionMode) => updateField('motion', value), [updateField])

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
  }, [])

  return (
    <AccessibilityContext.Provider
      value={{
        ...preferences,
        setFontSize,
        setContrast,
        setSpacing,
        setInterface,
        setMotion,
        resetPreferences,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}
