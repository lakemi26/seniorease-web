'use client'

import { GuestGuard } from '@/modules/authentication/presentation/components/GuestGuard'
import { LoginForm } from '@/modules/authentication/presentation/components/LoginForm'

export function LoginFormWrapper() {
  return (
    <GuestGuard>
      <LoginForm />
    </GuestGuard>
  )
}
