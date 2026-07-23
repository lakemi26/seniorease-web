'use client'

import { Card } from '@/presentation/components/ui/Card'
import { Modal } from '@/presentation/components/ui/Modal'
import { Button } from '@/presentation/components/ui/Button'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { AlertTriangle } from 'lucide-react'

interface DeleteAccountSectionProps {
  showDeleteConfirm: boolean
  isDeleting: boolean
  deleteError: string | null
  onOpenDelete: () => void
  onCloseDelete: () => void
  onConfirmDelete: () => Promise<void>
}

export function DeleteAccountSection({
  showDeleteConfirm,
  isDeleting,
  deleteError,
  onOpenDelete,
  onCloseDelete,
  onConfirmDelete,
}: DeleteAccountSectionProps) {
  return (
    <>
      <Card as="section" aria-label="Excluir conta">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-danger flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            Zona de perigo
          </h2>
          <p className="text-sm text-text-muted">
            Ao excluir sua conta, todas as suas atividades, preferências e dados
            pessoais serão removidos permanentemente. Esta ação não pode ser desfeita.
          </p>

          <div>
            <Button
              variant="outline"
              size="normal"
              onClick={onOpenDelete}
              className="text-danger border-danger hover:bg-danger-light"
            >
              Excluir minha conta
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={onCloseDelete}
        title="Excluir sua conta?"
        description="Todas as suas atividades, preferências e dados pessoais serão removidos permanentemente. Esta ação não pode ser desfeita."
      >
        <div className="flex flex-col gap-4">
          {deleteError && (
            <AccessibleAlert variant="error" message={deleteError} />
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="normal"
              onClick={onCloseDelete}
              disabled={isDeleting}
            >
              Manter minha conta
            </Button>
            <LoadingButton
              type="button"
              variant="primary"
              size="normal"
              loading={isDeleting}
              loadingText="Excluindo..."
              disabled={isDeleting}
              onClick={onConfirmDelete}
              className="bg-danger text-white hover:bg-danger-dark"
            >
              Sim, excluir minha conta
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </>
  )
}