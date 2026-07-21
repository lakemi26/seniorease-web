'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { useAuth } from '@/presentation/hooks/useAuth'
import { DashboardLayout } from '@/modules/dashboard/presentation/components/DashboardLayout'
import { ProfilePageContent } from '@/modules/authentication/presentation/components/ProfilePageContent'
import { PageLoader } from '@/presentation/components/feedback/PageLoader'

function ProfileRedirectGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, profile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    if (profile && !profile.firstAccessCompleted) {
      router.replace('/primeiro-acesso')
    }
  }, [isAuthenticated, isLoading, profile, router])

  if (isLoading) {
    return <PageLoader message="Carregando suas informações." />
  }

  if (!isAuthenticated) {
    return <PageLoader message="Redirecionando..." />
  }

  if (profile && !profile.firstAccessCompleted) {
    return <PageLoader message="Redirecionando..." />
  }

  return <>{children}</>
}

export function ProfilePageWrapper() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ProfileRedirectGuard>
          <ProfilePageContent />
        </ProfileRedirectGuard>
      </DashboardLayout>
    </AuthGuard>
  )
}
