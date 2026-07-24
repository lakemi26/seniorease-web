'use client'

import { useEffect, useRef, useState } from 'react'
import { usePersonalization } from '@/modules/personalization/presentation/hooks/usePersonalization'
import { PersonalizationSkeleton } from './PersonalizationSkeleton'
import { PersonalizationErrorState } from './PersonalizationErrorState'
import { FontSizeOptions } from './FontSizeOptions'
import { ContrastOptions } from './ContrastOptions'
import { SpacingOptions } from './SpacingOptions'
import { InterfaceModeOptions } from './InterfaceModeOptions'
import { GuidanceAndSafetyOptions } from './GuidanceAndSafetyOptions'
import { ReminderPreference } from './ReminderPreference'
import { PreferencesPreview } from './PreferencesPreview'
import { PreferencesActions } from './PreferencesActions'
import { ResetPreferencesConfirmation } from './ResetPreferencesConfirmation'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import Link from 'next/link'
import { HelpCircle } from 'lucide-react'
import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'

function UnsavedChangesGuard({ hasUnsavedChanges }: { hasUnsavedChanges: boolean }) {
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

export function PersonalizationPageContent() {
  const {
    pageState,
    draft,
    isSaving,
    hasUnsavedChanges,
    saveError,
    saveSuccess,
    showResetConfirm,
    showUnsavedConfirm,
    updateDraft,
    save,
    cancel,
    openResetConfirm,
    closeResetConfirm,
    confirmReset,
    retry,
    confirmLeave,
    dismissLeave,
  } = usePersonalization()
  const successRef = useRef<HTMLDivElement>(null)
  const announcement = saveSuccess
    ? 'Suas preferências foram salvas.'
    : saveError
      ? saveError
      : ''

  useEffect(() => {
    if (saveSuccess) {
      successRef.current?.focus()
    }
  }, [saveSuccess])

  if (pageState === 'loading') {
    return (
      <div key="loading">
        <LiveRegion message="Carregando suas preferências." />
        <PersonalizationSkeleton />
      </div>
    )
  }

  if (pageState === 'error') {
    return <PersonalizationErrorState onRetry={retry} />
  }

  return (
    <>
      <UnsavedChangesGuard hasUnsavedChanges={hasUnsavedChanges} />

      <LiveRegion message={announcement || 'Personalizar minha experiência'} />

      <ResetPreferencesConfirmation
        isOpen={showResetConfirm}
        onClose={closeResetConfirm}
        onConfirm={confirmReset}
      />

      <Modal
        isOpen={showUnsavedConfirm}
        onClose={dismissLeave}
        title="Sair sem salvar?"
        description="As alterações feitas nas suas preferências serão perdidas."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
          <Button variant="primary" size="normal" onClick={dismissLeave}>
            Continuar ajustando
          </Button>
          <Button variant="outline" size="normal" onClick={confirmLeave}>
            Sair sem salvar
          </Button>
        </div>
      </Modal>

      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-text">Personalizar minha experiência</h1>
          <p className="text-sm text-text-muted">
            Ajuste a forma como os textos, espaços e informações aparecem no SeniorEase.
          </p>
        </div>

        {saveSuccess && (
          <div ref={successRef} tabIndex={-1} className="outline-none">
            <AccessibleAlert
              variant="success"
              message="Suas preferências foram salvas."
            />
          </div>
        )}

        {saveError && (
          <AccessibleAlert variant="error" message={saveError} />
        )}

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-8">
              <FontSizeOptions
                value={draft.fontSize}
                onChange={(v) => updateDraft({ fontSize: v })}
              />

              <ContrastOptions
                value={draft.contrast}
                onChange={(v) => updateDraft({ contrast: v })}
              />

              <SpacingOptions
                value={draft.spacing}
                onChange={(v) => updateDraft({ spacing: v })}
              />

              <InterfaceModeOptions
                value={draft.interfaceMode}
                onChange={(v) => updateDraft({ interfaceMode: v })}
              />

              <GuidanceAndSafetyOptions
                enhancedFeedback={draft.enhancedFeedback}
                confirmCriticalActions={draft.confirmCriticalActions}
                reduceMotion={draft.reduceMotion}
                onChange={(key, value) => updateDraft({ [key]: value })}
              />

              <ReminderPreference
                remindersEnabled={draft.remindersEnabled}
                onChange={(v) => updateDraft({ remindersEnabled: v })}
              />
            </div>

            <div className="flex justify-start">
              <Link
                href="/ajuda?artigo=aumentar-texto&origem=personalizacao"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-md transition-colors"
              >
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                Precisa de ajuda com a personalização?
              </Link>
            </div>

            <PreferencesActions
              hasUnsavedChanges={hasUnsavedChanges}
              isSaving={isSaving}
              onSave={save}
              onCancel={cancel}
              onReset={openResetConfirm}
            />
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <PreferencesPreview draft={draft} />
          </div>
        </div>
      </div>
    </>
  )
}
