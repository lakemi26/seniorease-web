'use client'

import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'

interface ResetPreferencesConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ResetPreferencesConfirmation({
  isOpen,
  onClose,
  onConfirm,
}: ResetPreferencesConfirmationProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Restaurar configurações?"
      description="Suas preferências atuais serão substituídas pelas configurações padrão."
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
        <Button variant="outline" size="normal" onClick={onClose}>
          Manter minhas preferências
        </Button>
        <Button variant="primary" size="normal" onClick={onConfirm}>
          Sim, restaurar
        </Button>
      </div>
    </Modal>
  )
}
