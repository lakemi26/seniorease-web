'use client'

import { useState, useCallback, useContext, type ReactNode } from 'react'
import { AccessibilityContext } from '@/presentation/providers/AccessibilityProvider'
import type { AccessibilityPreferences, FontSize, ContrastMode, SpacingMode, InterfaceMode, MotionMode } from '@/shared/types'

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  fontSize: 'normal',
  contrast: 'normal',
  spacing: 'normal',
  interface: 'complete',
  motion: 'normal',
}

export function DemoAccessibilityProvider({ children }: { children: ReactNode }) {
  const globalContext = useContext(AccessibilityContext)
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES)

  const updateField = useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }, [])

  const setFontSize = useCallback((value: FontSize) => updateField('fontSize', value), [updateField])
  const setContrast = useCallback((value: ContrastMode) => {
    updateField('contrast', value)
    globalContext.setContrast(value)
  }, [updateField, globalContext])
  const setSpacing = useCallback((value: SpacingMode) => updateField('spacing', value), [updateField])
  const setInterface = useCallback((value: InterfaceMode) => updateField('interface', value), [updateField])
  const setMotion = useCallback((value: MotionMode) => updateField('motion', value), [updateField])

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
    globalContext.setContrast('normal')
  }, [globalContext])

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
