import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AccessibilityProvider } from '@/presentation/providers/AccessibilityProvider'
import { AuthProvider } from '@/presentation/providers/AuthProvider'
import { PreferencesProvider } from '@/presentation/providers/PreferencesProvider'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/shared/constants'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <PreferencesProvider>
            <AccessibilityProvider>
              {children}
            </AccessibilityProvider>
          </PreferencesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
