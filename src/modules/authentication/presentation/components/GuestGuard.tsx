'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { PageLoader } from '@/presentation/components/feedback/PageLoader'

interface GuestGuardProps {
  children: ReactNode
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { user, isAuthenticated, isLoading, profile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated) {
      if (!user?.emailVerified) {
        router.replace('/verificar-email')
      } else if (profile?.firstAccessCompleted) {
        router.replace('/dashboard')
      } else {
        router.replace('/primeiro-acesso')
      }
    }
  }, [isAuthenticated, isLoading, user, profile, router])

  if (isLoading) {
    return <PageLoader message="Carregando suas informações." />
  }

  if (isAuthenticated) {
    return <PageLoader message="Redirecionando..." />
  }

  return <>{children}</>
}
