'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { CreateActivityDialog } from './CreateActivityDialog'
import { ActivityDetailsDialog } from './ActivityDetailsDialog'
import { EditActivityDialog } from './EditActivityDialog'
import { ActivityExecutionDialog } from './execution/ActivityExecutionDialog'
import { useActivityDetails } from '../hooks/useActivityDetails'

const VALID_MODALS = ['nova', 'detalhes', 'editar', 'executar'] as const
type ModalType = (typeof VALID_MODALS)[number]

const ALLOWED_RETURN_ORIGINS = ['calendar', 'history', 'dashboard'] as const

function isValidModal(value: string | null): value is ModalType {
  return VALID_MODALS.includes(value as ModalType)
}

function isValidReturnOrigin(value: string | null): value is (typeof ALLOWED_RETURN_ORIGINS)[number] {
  return ALLOWED_RETURN_ORIGINS.includes(value as (typeof ALLOWED_RETURN_ORIGINS)[number])
}

export function ActivityModalController() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const modal = searchParams.get('modal')
  const activityId = searchParams.get('id')
  const from = searchParams.get('from')

  const { activity } = useActivityDetails(
    modal === 'detalhes' || modal === 'editar' ? activityId : null
  )

  const navigateToOrigin = useCallback(() => {
    if (isValidReturnOrigin(from)) {
      const originToPath: Record<string, string> = {
        history: '/historico',
        calendar: '/calendario',
        dashboard: '/dashboard',
      }
      router.replace(originToPath[from!])
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('modal')
      params.delete('id')
      params.delete('from')
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname)
    }
  }, [router, pathname, searchParams, from])

  const openExecution = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('modal', 'executar')
    params.set('id', id)
    router.replace(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const closeModal = useCallback(() => {
    if (isValidReturnOrigin(from)) {
      navigateToOrigin()
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('modal')
      params.delete('id')
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname)
    }
  }, [router, pathname, searchParams, from, navigateToOrigin])

  const openEdit = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('modal', 'editar')
    params.set('id', id)
    router.replace(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const openDetails = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('modal', 'detalhes')
    params.set('id', id)
    router.replace(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const handleDelete = useCallback(async (id: string) => {
    const { createFirebaseActivityRepository } = await import(
      '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
    )
    const { createActivityUseCases } = await import(
      '@/modules/activities/application/use-cases'
    )
    const repository = createFirebaseActivityRepository()
    const useCases = createActivityUseCases(repository)
    await useCases.deleteActivity(id)
    closeModal()
  }, [closeModal])

  if (!isValidModal(modal)) return null

  if (modal === 'nova') {
    return (
      <CreateActivityDialog isOpen onClose={closeModal} />
    )
  }

  if (modal === 'executar' && activityId) {
    return (
      <ActivityExecutionDialog
        activityId={activityId}
        isOpen
        onClose={() => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('modal', 'detalhes')
          params.set('id', activityId)
          if (from) params.set('from', from)
          router.replace(`${pathname}?${params.toString()}`)
        }}
      />
    )
  }

  if (modal === 'detalhes' && activityId) {
    return (
      <ActivityDetailsDialog
        activityId={activityId}
        isOpen
        onClose={closeModal}
        onEdit={openEdit}
        onDeleteConfirm={handleDelete}
        onStartExecution={openExecution}
        hideActions={from === 'history'}
      />
    )
  }

  if (modal === 'editar' && activityId && activity) {
    return (
      <EditActivityDialog
        isOpen
        activity={activity}
        onClose={closeModal}
        onSaved={openDetails}
      />
    )
  }

  if (modal === 'editar' && activityId && !activity) {
    return null
  }

  return null
}
