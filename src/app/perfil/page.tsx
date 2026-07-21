import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProfileSkeleton } from '@/modules/authentication/presentation/components/ProfileSkeleton'
import { ProfilePageWrapper } from './profile-page-wrapper'

export const metadata: Metadata = {
  title: 'Meu perfil | SeniorEase',
  description: 'Consulte e atualize as informações da sua conta no SeniorEase.',
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageWrapper />
    </Suspense>
  )
}
