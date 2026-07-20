'use client'

import { GuestGuard } from '@/modules/authentication/presentation/components/GuestGuard'
import { CadastroForm } from '@/modules/authentication/presentation/components/CadastroForm'

export function CadastroWrapper() {
  return (
    <GuestGuard>
      <CadastroForm />
    </GuestGuard>
  )
}
