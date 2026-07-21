'use client'

import { Card } from '@/presentation/components/ui/Card'
import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

interface AccountSecuritySectionProps {
  email: string
  isResetting: boolean
  showResetConfirm: boolean
  resetError: string | null
  resetSuccess: string | null
  onOpenReset: () => void
  onCloseReset: () => void
  onConfirmReset: () => Promise<void>
}

export function AccountSecuritySection({
  email,
  isResetting,
  showResetConfirm,
  resetError,
  resetSuccess,
  onOpenReset,
  onCloseReset,
  onConfirmReset,
}: AccountSecuritySectionProps) {
  return (
    <Card as="section" aria-label="Segurança da conta">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-text">Segurança da conta</h2>
        <p className="text-sm text-text-muted">
          Você pode solicitar um link para criar uma nova senha.
        </p>

        {resetSuccess && (
          <>
            <AccessibleAlert variant="success" message={resetSuccess} />
            <LiveRegion message={resetSuccess} />
          </>
        )}

        {resetError && !showResetConfirm && (
          <AccessibleAlert variant="error" message={resetError} />
        )}

        <div>
          <Button
            variant="outline"
            size="normal"
            onClick={onOpenReset}
          >
            Redefinir minha senha
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showResetConfirm}
        onClose={onCloseReset}
        title="Enviar link de redefinição?"
        description={`Enviaremos as orientações para ${email}.`}
      >
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="normal"
            onClick={onCloseReset}
            disabled={isResetting}
          >
            Voltar
          </Button>
          <LoadingButton
            type="button"
            variant="primary"
            size="normal"
            loading={isResetting}
            loadingText="Enviando..."
            disabled={isResetting}
            onClick={onConfirmReset}
          >
            Enviar link
          </LoadingButton>
        </div>
      </Modal>
    </Card>
  )
}
