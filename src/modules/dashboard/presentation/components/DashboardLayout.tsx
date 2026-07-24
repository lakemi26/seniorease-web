'use client'

import { DashboardHeader } from './DashboardHeader'
import { Sidebar } from './Sidebar'
import { MobileNavigation } from './MobileNavigation'
import { NotificationsProvider } from '@/notifications/presentation/providers/NotificationsProvider'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationsProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <DashboardHeader />

        <div className="flex flex-1">
          <Sidebar />

          <main
            id="main-content"
            className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6"
          >
            {children}
          </main>
        </div>

        <MobileNavigation />
      </div>
    </NotificationsProvider>
  )
}
