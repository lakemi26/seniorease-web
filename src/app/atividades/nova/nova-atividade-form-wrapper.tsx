'use client'

import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { ActivityForm } from '@/modules/activities/presentation/components/ActivityForm'

function NovaAtividadeInner() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-text mb-2">Nova atividade</h1>
      <p className="text-sm text-text-muted mb-8">
        Adicione as informações principais e, se desejar, divida a atividade em etapas.
      </p>
      <ActivityForm />
    </div>
  )
}

export function NovaAtividadeFormWrapper() {
  return (
    <AuthGuard>
      <NovaAtividadeInner />
    </AuthGuard>
  )
}
