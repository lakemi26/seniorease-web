'use client'

import { useState, useCallback, useEffect, useReducer, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { createFirebaseOnboardingRepository } from '@/modules/onboarding/infrastructure/firebase-onboarding.repository'
import { createOnboardingUseCases } from '@/modules/onboarding/application/use-cases'
import { DEFAULT_ONBOARDING_PREFERENCES } from '@/modules/onboarding/domain/entities'
import type { OnboardingPreferences } from '@/modules/onboarding/domain/entities'
import { ONBOARDING_STEPS } from '@/modules/onboarding/presentation/data/steps'

interface OnboardingUIState {
  currentStep: number
  preferences: OnboardingPreferences
}

type OnboardingAction =
  | { type: 'INIT_FROM_PROFILE'; step: number; fontSize: string; spacing: string }
  | { type: 'SET_STEP'; step: number }
  | { type: 'UPDATE_PREFERENCE'; key: keyof OnboardingPreferences; value: OnboardingPreferences[keyof OnboardingPreferences] }
  | { type: 'SET_PREFERENCES'; preferences: Partial<OnboardingPreferences> }

function onboardingReducer(state: OnboardingUIState, action: OnboardingAction): OnboardingUIState {
  switch (action.type) {
    case 'INIT_FROM_PROFILE':
      return {
        currentStep: action.step,
        preferences: {
          ...state.preferences,
          fontSize: action.fontSize === 'x-large' ? 'extraLarge' : action.fontSize as 'normal' | 'large' || state.preferences.fontSize,
          spacing: action.spacing === 'wide' ? 'expanded' : 'normal',
        },
      }
    case 'SET_STEP':
      return { ...state, currentStep: action.step }
    case 'UPDATE_PREFERENCE':
      return { ...state, preferences: { ...state.preferences, [action.key]: action.value } }
    case 'SET_PREFERENCES':
      return { ...state, preferences: { ...state.preferences, ...action.preferences } }
    default:
      return state
  }
}

const repository = createFirebaseOnboardingRepository()
const onboardingUseCases = createOnboardingUseCases(repository)

export function useOnboarding() {
  const { user, profile, refreshProfile } = useAuth()
  const accessibility = useAccessibility()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const [state, dispatch] = useReducer(onboardingReducer, {
    currentStep: 1,
    preferences: DEFAULT_ONBOARDING_PREFERENCES,
  })

  useEffect(() => {
    if (profile) {
      dispatch({
        type: 'INIT_FROM_PROFILE',
        step: profile.onboardingStep || 1,
        fontSize: accessibility.fontSize,
        spacing: accessibility.spacing,
      })
    }
  }, [profile, accessibility.fontSize, accessibility.spacing])

  const announceStep = useCallback(() => {
    const timer = setTimeout(() => {
      headingRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const goToStep = useCallback(async (step: number) => {
    dispatch({ type: 'SET_STEP', step })
    announceStep()
  }, [announceStep])

  const saveCurrentProgress = useCallback(async () => {
    if (!user) return
    setIsSaving(true)
    setSaveError('')

    try {
      await onboardingUseCases.saveOnboardingProgress(user.uid, state.currentStep, state.preferences)
    } catch (error) {
      console.error('[onboarding] save progress error:', error)
      setSaveError('Não foi possível salvar suas escolhas. Verifique sua conexão e tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }, [user, state.currentStep, state.preferences])

  const nextStep = useCallback(async () => {
    if (state.currentStep < ONBOARDING_STEPS.length) {
      const next = state.currentStep + 1
      await saveCurrentProgress()
      if (next <= ONBOARDING_STEPS.length) {
        dispatch({ type: 'SET_STEP', step: next })
        announceStep()
      }
    }
  }, [state.currentStep, saveCurrentProgress, announceStep])

  const previousStep = useCallback(() => {
    if (state.currentStep > 1) {
      const prev = state.currentStep - 1
      dispatch({ type: 'SET_STEP', step: prev })
      announceStep()
    }
  }, [state.currentStep, announceStep])

  const updatePreference = useCallback(<K extends keyof OnboardingPreferences>(
    key: K,
    value: OnboardingPreferences[K]
  ) => {
    dispatch({ type: 'UPDATE_PREFERENCE', key, value })

    if (key === 'fontSize') {
      accessibility.setFontSize(value === 'extraLarge' ? 'x-large' : value as 'normal' | 'large')
    } else if (key === 'contrast') {
      accessibility.setContrast(value === 'default' ? 'normal' as const : value as 'high' | 'dark')
    } else if (key === 'spacing') {
      accessibility.setSpacing(value === 'expanded' ? 'wide' as const : 'normal' as const)
    } else if (key === 'interfaceMode') {
      accessibility.setInterface(value as 'basic' | 'complete')
    }
  }, [accessibility])

  const completeOnboarding = useCallback(async () => {
    if (!user) return
    setIsSaving(true)
    setSaveError('')

    try {
      await onboardingUseCases.completeFirstAccess(
        user.uid,
        state.preferences,
        { name: user.displayName || '', email: user.email || '' },
      )
      accessibility.setFontSize(
        state.preferences.fontSize === 'extraLarge' ? 'x-large' : state.preferences.fontSize
      )
      accessibility.setContrast(
        state.preferences.contrast === 'default' ? 'normal' as const :
        state.preferences.contrast === 'high' ? 'high' as const : 'dark' as const
      )
      accessibility.setSpacing(
        state.preferences.spacing === 'expanded' ? 'wide' as const : 'normal' as const
      )
      accessibility.setInterface(state.preferences.interfaceMode as 'basic' | 'complete')
      accessibility.setMotion(state.preferences.reduceMotion ? 'reduced' as const : 'normal' as const)

      setIsCompleted(true)
      await refreshProfile()

      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch {
      setSaveError('Não foi possível salvar suas escolhas. Verifique sua conexão e tente novamente.')
      setIsSaving(false)
    }
  }, [user, state.preferences, accessibility, refreshProfile, router])

  return {
    currentStep: state.currentStep,
    totalSteps: ONBOARDING_STEPS.length,
    steps: ONBOARDING_STEPS,
    preferences: state.preferences,
    isSaving,
    saveError,
    isCompleted,
    headingRef,
    goToStep,
    nextStep,
    previousStep,
    updatePreference,
    completeOnboarding,
    setSaveError,
  }
}
