'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { PageLoader } from '@/presentation/components/feedback/PageLoader'

interface AuthGuardProps {
  children: ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <PageLoader message="Carregando suas informações." />
  }

  if (!isAuthenticated) {
    return <PageLoader message="Redirecionando..." />
  }

  return <>{children}</>
}
