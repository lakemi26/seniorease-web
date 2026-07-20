'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/modules/authentication/presentation/schemas/login.schema'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { translateAuthError } from '@/infrastructure/firebase/firebase.errors'

const repository = createFirebaseAuthRepository()
const authUseCases = createAuthUseCases(repository)

export function useLogin() {
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const rememberMe = useWatch({ control, name: 'rememberMe' })

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsSubmitting(true)
      setApiError('')

      try {
        const user = await authUseCases.signInUser(data.email, data.password, data.rememberMe ?? false)
        if (!user.emailVerified) {
          router.push('/verificar-email')
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        const message = translateAuthError(error)
        setApiError(message)
        setIsSubmitting(false)
      }
    },
    [router]
  )

  const handleInvalidForm = useCallback(() => {
    if (errors.email) {
      setFocus('email')
    } else if (errors.password) {
      setFocus('password')
    }
  }, [errors, setFocus])

  return {
    register,
    handleSubmit: handleSubmit(onSubmit, handleInvalidForm),
    errors,
    apiError,
    isSubmitting,
    setApiError,
    rememberMe,
    setRememberMe: (checked: boolean) => setValue('rememberMe', checked as never),
  }
}
