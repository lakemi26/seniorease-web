'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  cadastroSchema,
  type CadastroFormData,
} from '@/modules/authentication/presentation/schemas/cadastro.schema'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { translateRegistrationError } from '@/infrastructure/firebase/firebase.errors'

const repository = createFirebaseAuthRepository()
const authUseCases = createAuthUseCases(repository)

export function useRegister() {
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false as unknown as true,
    },
  })

  const onSubmit = useCallback(async (data: CadastroFormData) => {
    setIsSubmitting(true)
    setApiError('')

    try {
      await authUseCases.signUpUser(data.email, data.password, data.name)
      setIsSuccess(true)
      router.push('/verificar-email')
    } catch (error) {
      const message = translateRegistrationError(error)
      setApiError(message)
      setIsSubmitting(false)
    }
  }, [router])

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    apiError,
    isSubmitting,
    isSuccess,
    setApiError,
  }
}
