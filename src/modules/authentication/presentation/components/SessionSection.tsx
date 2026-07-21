'use client'

import { Card } from '@/presentation/components/ui/Card'
import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'

interface SessionSectionProps {
  showSignOutConfirm: boolean
  onOpenSignOut: () => void
  onCloseSignOut: () => void
  onConfirmSignOut: () => Promise<void>
}

export function SessionSection({
  showSignOutConfirm,
  onOpenSignOut,
  onCloseSignOut,
  onConfirmSignOut,
}: SessionSectionProps) {
  return (
    <Card as="section" aria-label="Sessão">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-text">Sessão</h2>
        <p className="text-sm text-text-muted">
          Você sairá da sua conta e precisará entrar novamente para acessar suas atividades.
        </p>
        <div>
          <Button
            variant="outline"
            size="normal"
            onClick={onOpenSignOut}
          >
            Sair da conta
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showSignOutConfirm}
        onClose={onCloseSignOut}
        title="Sair da conta?"
        description="Você precisará entrar novamente para acessar suas atividades."
      >
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="normal"
            onClick={onCloseSignOut}
          >
            Continuar conectado
          </Button>
          <Button
            type="button"
            variant="primary"
            size="normal"
            onClick={onConfirmSignOut}
          >
            Sair da conta
          </Button>
        </div>
      </Modal>
    </Card>
  )
}
