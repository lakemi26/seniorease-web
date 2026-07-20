'use client'

import { useContext } from 'react'
import { AccessibilityContext } from '@/presentation/providers/AccessibilityProvider'
import type { AccessibilityContextType } from '@/presentation/providers/AccessibilityProvider'

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
