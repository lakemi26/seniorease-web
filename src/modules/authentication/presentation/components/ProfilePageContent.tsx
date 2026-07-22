'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/presentation/hooks/useAuth'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { useProfile } from '@/modules/authentication/presentation/hooks/useProfile'
import { ProfileSkeleton } from '@/modules/authentication/presentation/components/ProfileSkeleton'
import { ProfileErrorState } from '@/modules/authentication/presentation/components/ProfileErrorState'
import { ProfileNotFoundState } from '@/modules/authentication/presentation/components/ProfileNotFoundState'
import { PersonalInformationSection } from '@/modules/authentication/presentation/components/PersonalInformationSection'
import { AccountSecuritySection } from '@/modules/authentication/presentation/components/AccountSecuritySection'
import { PersonalizationShortcut } from '@/modules/authentication/presentation/components/PersonalizationShortcut'
import { SessionSection } from '@/modules/authentication/presentation/components/SessionSection'
import Link from 'next/link'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { Container } from '@/presentation/components/layout/Container'
import { Card } from '@/presentation/components/ui/Card'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'

function UnsavedChangesGuard({
  hasUnsavedChanges,
}: {
  hasUnsavedChanges: boolean
}) {
  useEffect(() => {
    if (!hasUnsavedChanges) return

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  return null
}

export function ProfilePageContent() {
  const { user } = useAuth()
  const { interface: interfaceMode } = useAccessibility()
  const router = useRouter()
  const announcementRef = useRef<string>('')

  const {
    profile,
    pageState,
    isEditing,
    isSaving,
    isResetting,
    showResetConfirm,
    showSignOutConfirm,
    nameError,
    resetError,
    nameSuccess,
    resetSuccess,
    originalName,
    retry,
    startEditing,
    cancelEditing,
    openResetConfirm,
    closeResetConfirm,
    confirmReset,
    openSignOutConfirm,
    closeSignOutConfirm,
    confirmSignOut,
    hasUnsavedChanges,
    register,
    onFormSubmit,
    errors,
  } = useProfile()

  useEffect(() => {
    if (nameSuccess) {
      announcementRef.current = nameSuccess
    } else if (resetSuccess) {
      announcementRef.current = resetSuccess
    }
  }, [nameSuccess, resetSuccess])

  if (pageState === 'loading') {
    return (
      <div key="loading">
        <LiveRegion message="Carregando seu perfil." />
        <ProfileSkeleton />
      </div>
    )
  }

  if (pageState === 'error') {
    return <ProfileErrorState onRetry={retry} />
  }

  if (pageState === 'not-found' || !profile) {
    return <ProfileNotFoundState onRetry={retry} />
  }

  const currentName = (profile.name || user?.displayName || '')

  return (
    <>
      <UnsavedChangesGuard hasUnsavedChanges={hasUnsavedChanges} />

      <LiveRegion message={announcementRef.current || 'Perfil carregado.'} />

      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-text">Meu perfil</h1>
          <p className="text-sm text-text-muted">
            Consulte e atualize as informações da sua conta.
          </p>
        </div>

        <PersonalInformationSection
          profile={profile}
          isEditing={isEditing}
          isSaving={isSaving}
          nameError={nameError}
          nameSuccess={nameSuccess}
          currentName={currentName}
          onStartEditing={startEditing}
          onCancelEditing={cancelEditing}
          register={register}
          errors={errors}
          onSubmit={onFormSubmit}
        />

        <AccountSecuritySection
          email={profile.email}
          isResetting={isResetting}
          showResetConfirm={showResetConfirm}
          resetError={resetError}
          resetSuccess={resetSuccess}
          onOpenReset={openResetConfirm}
          onCloseReset={closeResetConfirm}
          onConfirmReset={confirmReset}
        />

        <PersonalizationShortcut />

        <div className="flex justify-start">
          <Link
            href="/ajuda?artigo=entrar-conta&origem=perfil"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-md transition-colors"
          >
            Precisa de ajuda com sua conta?
          </Link>
        </div>

        <SessionSection
          showSignOutConfirm={showSignOutConfirm}
          onOpenSignOut={openSignOutConfirm}
          onCloseSignOut={closeSignOutConfirm}
          onConfirmSignOut={confirmSignOut}
        />
      </div>
    </>
  )
}
