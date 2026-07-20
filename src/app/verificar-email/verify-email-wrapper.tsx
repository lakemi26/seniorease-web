'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { PageLoader } from '@/presentation/components/feedback/PageLoader'

const repository = createFirebaseAuthRepository()
const authUseCases = createAuthUseCases(repository)

export function VerifyEmailWrapper() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resending, setResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.emailVerified) {
      router.replace('/primeiro-acesso')
    }
  }, [isLoading, isAuthenticated, user, router])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleCheckVerification = useCallback(async () => {
    if (!user) return
    setChecking(true)
    setError('')
    setSuccess('')

    try {
      await repository.reloadUser(user)
      if (user.emailVerified) {
        await authUseCases.updateUserProfile(user.uid, {
          emailVerified: true,
          updatedAt: new Date().toISOString(),
        })
        setSuccess('E-mail confirmado! Redirecionando...')
        setTimeout(() => router.push('/primeiro-acesso'), 1500)
      } else {
        setError('A confirmação ainda não foi identificada. Verifique sua caixa de entrada e tente novamente.')
      }
    } catch {
      setError('Não foi possível verificar seu e-mail. Tente novamente.')
    } finally {
      setChecking(false)
    }
  }, [user, router])

  const handleResend = useCallback(async () => {
    if (!user || resending || resendCooldown > 0) return
    setResending(true)
    setError('')
    setSuccess('')

    try {
      await repository.sendEmailVerification(user)
      setSuccess('Mensagem reenviada! Verifique sua caixa de entrada.')
      setResendCooldown(60)
    } catch {
      setError('Não foi possível reenviar o e-mail. Tente novamente em alguns instantes.')
    } finally {
      setResending(false)
    }
  }, [user, resending, resendCooldown])

  const handleSignOut = useCallback(async () => {
    await signOut()
    router.push('/')
  }, [signOut, router])

  if (isLoading) {
    return <PageLoader message="Carregando..." />
  }

  if (!isAuthenticated || !user) {
    return <PageLoader message="Redirecionando..." />
  }

  if (user.emailVerified) {
    return <PageLoader message="Redirecionando..." />
  }

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div aria-hidden="true" className="mb-2">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          className="mx-auto"
        >
          <rect width="80" height="80" rx="40" fill="#F59E0B" opacity="0.1" />
          <path
            d="M56 28H24a4 4 0 00-4 4v24a4 4 0 004 4h32a4 4 0 004-4V32a4 4 0 00-4-4zm-1.6 4L40 42.8 25.6 32h28.8zM24 56V35.2l15.2 11.2a1.6 1.6 0 001.6 0L56 35.2V56H24z"
            fill="#F59E0B"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-text">
        Confirme seu e-mail
      </h1>

      <p className="text-text-secondary text-base max-w-md leading-relaxed">
        Enviamos uma mensagem de confirmação para{' '}
        <strong className="text-text">{user.email}</strong>.
        Abra a mensagem e selecione o link para continuar.
      </p>

      {error && (
        <AccessibleAlert
          variant="error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      {success && (
        <AccessibleAlert
          variant="success"
          message={success}
        />
      )}

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <LoadingButton
          variant="primary"
          size="large"
          loading={checking}
          loadingText="Verificando..."
          onClick={handleCheckVerification}
          className="w-full"
        >
          Já confirmei meu e-mail
        </LoadingButton>

        <LoadingButton
          variant="outline"
          size="large"
          loading={resending}
          loadingText="Enviando..."
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="w-full"
        >
          {resendCooldown > 0
            ? `Reenviar (${resendCooldown}s)`
            : 'Enviar novamente'}
        </LoadingButton>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm text-text-muted hover:text-text underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm transition-colors duration-normal cursor-pointer"
      >
        Sair e usar outra conta
      </button>
    </div>
  )
}
