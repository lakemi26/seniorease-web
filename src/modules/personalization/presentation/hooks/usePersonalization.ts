'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { usePreferences } from '@/presentation/hooks/usePreferences'
import type { UserPreferences } from '@/modules/authentication/domain/entities'
import { DEFAULT_USER_PREFERENCES } from '@/modules/authentication/domain/entities'
import { mapToDataAttributes } from '@/presentation/providers/PreferencesProvider'

function preferencesEqual(a: UserPreferences, b: UserPreferences): boolean {
  return (
    a.fontSize === b.fontSize &&
    a.contrast === b.contrast &&
    a.spacing === b.spacing &&
    a.interfaceMode === b.interfaceMode &&
    a.enhancedFeedback === b.enhancedFeedback &&
    a.confirmCriticalActions === b.confirmCriticalActions &&
    a.reduceMotion === b.reduceMotion &&
    a.remindersEnabled === b.remindersEnabled
  )
}

interface UsePersonalizationReturn {
  pageState: 'loading' | 'error' | 'content'
  draft: UserPreferences
  savedPreferences: UserPreferences
  isSaving: boolean
  hasUnsavedChanges: boolean
  saveError: string | null
  saveSuccess: boolean
  showResetConfirm: boolean
  showUnsavedConfirm: boolean
  pendingNavigation: string | null
  updateDraft: (updates: Partial<UserPreferences>) => void
  save: () => Promise<void>
  cancel: () => void
  openResetConfirm: () => void
  closeResetConfirm: () => void
  confirmReset: () => Promise<void>
  retry: () => void
  confirmLeave: () => void
  dismissLeave: () => void
}

export function usePersonalization(): UsePersonalizationReturn {
  const { preferences, isLoading, error, updatePreferences, resetPreferences } = usePreferences()
  const router = useRouter()
  const [draft, setDraft] = useState<UserPreferences>(preferences)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const previousDraftRef = useRef<UserPreferences>(draft)

  const pageState: 'loading' | 'error' | 'content' =
    isLoading ? 'loading' : error ? 'error' : 'content'

  useEffect(() => {
    if (!isLoading && !error) {
      setDraft(preferences)
    }
  }, [isLoading, error]) // only sync from provider when loading finishes

  const hasUnsavedChanges = !preferencesEqual(draft, preferences)

  // apply draft attributes temporarily for preview
  useEffect(() => {
    if (hasUnsavedChanges) {
      const attrs = mapToDataAttributes(draft)
      const root = document.documentElement
      const previous: Record<string, string | null> = {}
      for (const [key, value] of Object.entries(attrs)) {
        previous[key] = root.getAttribute(key)
        root.setAttribute(key, value)
      }
      previousDraftRef.current = draft
      return () => {
        // restore saved attributes on cleanup (cancel)
        for (const [key, value] of Object.entries(previous)) {
          if (value !== null) {
            root.setAttribute(key, value)
          } else {
            root.removeAttribute(key)
          }
        }
      }
    }
  }, [draft, hasUnsavedChanges])

  const updateDraft = useCallback((updates: Partial<UserPreferences>) => {
    setDraft(prev => ({ ...prev, ...updates }))
    setSaveSuccess(false)
    setSaveError(null)
  }, [])

  const save = useCallback(async () => {
    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)
    try {
      await updatePreferences(draft)
      setSaveSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSaveError('Não foi possível salvar suas preferências. Verifique sua conexão e tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }, [draft, updatePreferences])

  const cancel = useCallback(() => {
    setDraft(preferences)
    setSaveError(null)
    setSaveSuccess(false)
  }, [preferences])

  const openResetConfirm = useCallback(() => {
    setSaveError(null)
    setShowResetConfirm(true)
  }, [])

  const closeResetConfirm = useCallback(() => {
    setShowResetConfirm(false)
  }, [])

  const confirmReset = useCallback(async () => {
    setShowResetConfirm(false)
    setIsSaving(true)
    setSaveError(null)
    setSaveSuccess(false)
    try {
      await resetPreferences()
      setDraft(DEFAULT_USER_PREFERENCES)
      setSaveSuccess(true)
    } catch {
      setSaveError('Não foi possível restaurar as configurações. Verifique sua conexão e tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }, [resetPreferences])

  const retry = useCallback(() => {
    window.location.reload()
  }, [])

  const confirmLeave = useCallback(() => {
    if (pendingNavigation) {
      router.push(pendingNavigation)
    }
    setShowUnsavedConfirm(false)
    setPendingNavigation(null)
  }, [pendingNavigation, router])

  const dismissLeave = useCallback(() => {
    setShowUnsavedConfirm(false)
    setPendingNavigation(null)
  }, [])

  return {
    pageState,
    draft,
    savedPreferences: preferences,
    isSaving,
    hasUnsavedChanges,
    saveError,
    saveSuccess,
    showResetConfirm,
    showUnsavedConfirm,
    pendingNavigation,
    updateDraft,
    save,
    cancel,
    openResetConfirm,
    closeResetConfirm,
    confirmReset,
    retry,
    confirmLeave,
    dismissLeave,
  }
}
