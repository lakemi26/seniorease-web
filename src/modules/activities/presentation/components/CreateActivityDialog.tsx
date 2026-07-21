'use client'

import { Modal } from '@/presentation/components/ui/Modal'
import { ActivityForm } from './ActivityForm'

interface CreateActivityDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateActivityDialog({ isOpen, onClose }: CreateActivityDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova atividade">
      <p className="text-sm text-text-muted mb-6">
        Adicione as informações principais e, se desejar, divida a atividade em etapas.
      </p>
      <ActivityForm mode="create" onSuccess={onClose} onCancel={onClose} />
    </Modal>
  )
}
