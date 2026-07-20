'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  passwordRecoverySchema,
  type PasswordRecoveryFormData,
} from '@/modules/authentication/presentation/schemas/password-recovery.schema'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { translateRecoveryError } from '@/infrastructure/firebase/firebase.errors'

const repository = createFirebaseAuthRepository()
const authUseCases = createAuthUseCases(repository)

export function usePasswordRecovery() {
  const [apiError, setApiError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormData>({
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = useCallback(async (data: PasswordRecoveryFormData) => {
    setIsSubmitting(true)
    setApiError('')

    try {
      await authUseCases.sendPasswordReset(data.email)
      setIsSubmitted(true)
    } catch (error) {
      const message = translateRecoveryError(error)
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    apiError,
    isSubmitted,
    isSubmitting,
    setApiError,
  }
}
