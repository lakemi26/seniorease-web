'use client'

import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { OnboardingGuard } from '@/modules/authentication/presentation/components/OnboardingGuard'
import { OnboardingContainer } from '@/modules/onboarding/presentation/components/OnboardingContainer'

export function OnboardingPageWrapper() {
  return (
    <AuthGuard>
      <OnboardingGuard redirectIfCompleted>
        <OnboardingContainer />
      </OnboardingGuard>
    </AuthGuard>
  )
}
