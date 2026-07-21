'use client'

import { type ReactNode } from 'react'
import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { DashboardLayout } from '@/modules/dashboard/presentation/components/DashboardLayout'
export function DashboardPagesLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  )
}
