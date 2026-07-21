'use client'

import { Modal } from '@/presentation/components/ui/Modal'
import { ActivityForm } from './ActivityForm'

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateActivityModal({ isOpen, onClose }: CreateActivityModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova atividade">
      <ActivityForm onSuccess={onClose} onCancel={onClose} />
    </Modal>
  )
}
