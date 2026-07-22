import { Suspense } from 'react'
import type { Metadata } from 'next'
import { DashboardPagesLayout } from '../dashboard-pages-layout'
import { HelpPageClient } from './help-page-client'

export const metadata: Metadata = {
  title: 'Ajuda | SeniorEase',
  description: 'Orientações para utilizar os recursos do SeniorEase.',
}

function HelpPageFallback() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-8" aria-busy="true">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-border rounded-md animate-pulse" />
        <div className="h-5 w-96 bg-border rounded-md animate-pulse" />
      </div>
      <div className="h-14 bg-border rounded-xl animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-border rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function AjudaPage() {
  return (
    <DashboardPagesLayout>
      <Suspense fallback={<HelpPageFallback />}>
        <HelpPageClient />
      </Suspense>
    </DashboardPagesLayout>
  )
}
