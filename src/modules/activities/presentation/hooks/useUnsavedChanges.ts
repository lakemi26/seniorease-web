'use client'

import { useState, useEffect, useCallback } from 'react'

export function useUnsavedChanges(
  isDirty: boolean,
  onConfirm: () => void,
  onCancel?: () => void
) {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const askToProceed = useCallback(() => {
    setShowConfirmation(true)
  }, [])

  const confirmLeaving = useCallback(() => {
    setShowConfirmation(false)
    onConfirm()
  }, [onConfirm])

  const cancelLeaving = useCallback(() => {
    setShowConfirmation(false)
    onCancel?.()
  }, [onCancel])

  useEffect(() => {
    if (isDirty) {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault()
      }
      window.addEventListener('beforeunload', handler)
      return () => window.removeEventListener('beforeunload', handler)
    }
  }, [isDirty])

  return { showConfirmation, askToProceed, confirmLeaving, cancelLeaving }
}
