'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { PageLoader } from '@/presentation/components/feedback/PageLoader'

interface OnboardingGuardProps {
  redirectTo?: string
  redirectIfCompleted?: boolean
  children: ReactNode
}

export function OnboardingGuard({
  children,
  redirectTo = '/login',
  redirectIfCompleted = false,
}: OnboardingGuardProps) {
  const { isAuthenticated, isLoading, profile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.replace(redirectTo)
      return
    }

    if (redirectIfCompleted && profile?.firstAccessCompleted) {
      router.replace('/dashboard')
      return
    }

    if (!redirectIfCompleted && !profile?.firstAccessCompleted) {
      router.replace('/primeiro-acesso')
      return
    }
  }, [isAuthenticated, isLoading, profile, redirectIfCompleted, redirectTo, router])

  if (isLoading) {
    return <PageLoader message="Carregando suas informações." />
  }

  if (!isAuthenticated) {
    return <PageLoader message="Redirecionando..." />
  }

  if (redirectIfCompleted && profile?.firstAccessCompleted) {
    return <PageLoader message="Redirecionando..." />
  }

  if (!redirectIfCompleted && !profile?.firstAccessCompleted) {
    return <PageLoader message="Redirecionando..." />
  }

  return <>{children}</>
}
