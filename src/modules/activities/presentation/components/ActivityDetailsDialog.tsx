'use client'

import { useState, useCallback } from 'react'
import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'
import { ActivityDetails } from './ActivityDetails'
import { ActivityDeleteConfirmation } from './ActivityDeleteConfirmation'
import { useActivityDetails } from '../hooks/useActivityDetails'

interface ActivityDetailsDialogProps {
  activityId: string | null
  isOpen: boolean
  onClose: () => void
  onEdit: (id: string) => void
  onDeleteConfirm: (id: string) => void
  onStartExecution?: (id: string) => void
  hideActions?: boolean
}

export function ActivityDetailsDialog({ activityId, isOpen, onClose, onEdit, onDeleteConfirm, onStartExecution, hideActions = false }: ActivityDetailsDialogProps) {
  const { activity, loading, error, notFound } = useActivityDetails(activityId)
  const [view, setView] = useState<'details' | 'confirm-delete'>('details')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(async () => {
    if (!activityId) return
    setIsDeleting(true)
    onDeleteConfirm(activityId)
  }, [activityId, onDeleteConfirm])

  const handleEdit = useCallback(() => {
    if (activityId) onEdit(activityId)
  }, [activityId, onEdit])

  const handleClose = useCallback(() => {
    setView('details')
    onClose()
  }, [onClose])

  if (!isOpen) return null

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-10 h-10 rounded-full bg-primary-light animate-pulse mb-4" />
          <p className="text-sm text-text-muted">Carregando atividade.</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-danger mb-4">Não foi possível carregar esta atividade.</p>
          <Button variant="outline" onClick={handleClose}>Fechar</Button>
        </div>
      )
    }

    if (notFound || !activity) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-text-muted mb-4">Esta atividade não está disponível.</p>
          <Button variant="outline" onClick={handleClose}>Fechar</Button>
        </div>
      )
    }

    if (view === 'confirm-delete') {
      return (
        <ActivityDeleteConfirmation
          activityTitle={activity.title}
          onConfirm={handleDelete}
          onBack={() => setView('details')}
          isDeleting={isDeleting}
        />
      )
    }

    return (
      <div className="flex flex-col gap-6">
        <ActivityDetails activity={activity} />

        {!hideActions && activity.status !== 'completed' && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-border">
            {activity.status === 'pending' && onStartExecution && (
              <Button variant="primary" size="large" onClick={() => onStartExecution(activityId!)}>
                Começar atividade
              </Button>
            )}
            {activity.status === 'inProgress' && onStartExecution && (
              <Button variant="primary" size="large" onClick={() => onStartExecution(activityId!)}>
                Continuar atividade
              </Button>
            )}
            <Button variant="outline" onClick={handleClose}>
              Fechar
            </Button>
            {(activity.status === 'pending' || activity.status === 'inProgress') && (
              <Button variant="outline" onClick={handleEdit}>
                Editar atividade
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setView('confirm-delete')}
              className="text-danger border-danger hover:bg-danger-light"
            >
              Excluir atividade
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Detalhes da atividade">
      {renderContent()}
    </Modal>
  )
}
