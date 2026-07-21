'use client'

import { Modal } from '@/presentation/components/ui/Modal'
import { ActivityForm } from './ActivityForm'
import type { Activity } from '../../domain/entities'

interface EditActivityDialogProps {
  isOpen: boolean
  activity: Activity
  onClose: () => void
  onSaved: (activityId: string) => void
}

export function EditActivityDialog({ isOpen, activity, onClose, onSaved }: EditActivityDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar atividade">
      <p className="text-sm text-text-muted mb-6">
        Atualize as informações necessárias e salve suas alterações.
      </p>
      <ActivityForm mode="edit" initialValues={activity} onSuccess={() => onSaved(activity.id)} onCancel={onClose} />
    </Modal>
  )
}
