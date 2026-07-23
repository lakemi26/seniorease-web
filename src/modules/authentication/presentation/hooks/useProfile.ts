'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  profileSchema,
  type ProfileFormData,
} from '@/modules/authentication/presentation/schemas/profile.schema'
import { createFirebaseAuthRepository } from '@/modules/authentication/infrastructure/firebase-auth.repository'
import { createAuthUseCases } from '@/modules/authentication/application/use-cases'
import { useAuth } from '@/presentation/hooks/useAuth'
import { translateAuthError, translateRecoveryError } from '@/infrastructure/firebase/firebase.errors'
import { updateProfile } from 'firebase/auth'
import type { UserProfile } from '@/modules/authentication/domain/entities'

const authRepository = createFirebaseAuthRepository()
const authUseCases = createAuthUseCases(authRepository)

export type ProfilePageState =
  | 'loading'
  | 'error'
  | 'not-found'
  | 'content'

export interface UseProfileReturn {
  profile: UserProfile | null
  pageState: ProfilePageState
  isEditing: boolean
  isSaving: boolean
  isResetting: boolean
  showResetConfirm: boolean
  showSignOutConfirm: boolean
  showDeleteConfirm: boolean
  isDeleting: boolean
  deleteError: string | null
  nameError: string | null
  profileError: string | null
  resetError: string | null
  nameSuccess: string | null
  resetSuccess: string | null
  originalName: string
  retry: () => void
  startEditing: () => void
  cancelEditing: () => void
  onNameSubmit: (data: ProfileFormData) => Promise<void>
  openResetConfirm: () => void
  closeResetConfirm: () => void
  confirmReset: () => Promise<void>
  openSignOutConfirm: () => void
  closeSignOutConfirm: () => void
  confirmSignOut: () => Promise<void>
  openDeleteConfirm: () => void
  closeDeleteConfirm: () => void
  confirmDelete: () => Promise<void>
  hasUnsavedChanges: boolean
  register: ReturnType<typeof useForm<ProfileFormData>>['register']
  onFormSubmit: React.FormEventHandler<HTMLFormElement>
  errors: ReturnType<typeof useForm<ProfileFormData>>['formState']['errors']
  setValue: ReturnType<typeof useForm<ProfileFormData>>['setValue']
}

export function useProfile(): UseProfileReturn {
  const { user, signOut: authSignOut, updateProfileState } = useAuth()
  const router = useRouter()
  const [pageState, setPageState] = useState<ProfilePageState>('loading')
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetSuccess, setResetSuccess] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)
  const [nameSuccess, setNameSuccess] = useState<string | null>(null)
  const [originalName, setOriginalName] = useState('')
  const savedNameRef = useRef('')

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '' },
  })

  const currentName = watch('name')
  const hasUnsavedChanges = isEditing && currentName !== originalName

  useEffect(() => {
    if (!user) {
      setPageState('loading')
      return
    }

    const unsubscribe = authUseCases.subscribeToUserProfile(
      user.uid,
      (loaded) => {
        if (!loaded) {
          setPageState('not-found')
          return
        }
        setLocalProfile(loaded)
        updateProfileState(loaded)
        savedNameRef.current = loaded.name
        setOriginalName(loaded.name)
        setValue('name', loaded.name)
        setPageState('content')
      },
      () => {
        setPageState('error')
      },
    )

    return () => unsubscribe()
  }, [user, setValue, updateProfileState])

  const retry = useCallback(() => {
    setPageState('loading')
    setProfileError(null)
    window.location.reload()
  }, [])

  const startEditing = useCallback(() => {
    setNameError(null)
    setNameSuccess(null)
    if (localProfile) {
      const name = localProfile.name || ''
      setOriginalName(name)
      setValue('name', name)
    }
    setIsEditing(true)
  }, [localProfile, setValue])

  const cancelEditing = useCallback(() => {
    setIsEditing(false)
    setNameError(null)
    setNameSuccess(null)
    setValue('name', savedNameRef.current)
  }, [setValue])

  const onNameSubmit = useCallback(
    async (data: ProfileFormData) => {
      if (!user || !localProfile) return

      const trimmedName = data.name.trim().replace(/\s+/g, ' ')

      if (trimmedName === savedNameRef.current) {
        setNameError(null)
        setNameSuccess('')
        setIsEditing(false)
        return
      }

      setIsSaving(true)
      setNameError(null)
      setNameSuccess(null)

      try {
        await authUseCases.updateUserName(user.uid, trimmedName)

        if (user.displayName !== trimmedName) {
          try {
            await updateProfile(user, { displayName: trimmedName })
          } catch {
            console.warn(
              '[Profile] displayName update failed; Firestore already updated.',
            )
          }
        }

        savedNameRef.current = trimmedName
        setOriginalName(trimmedName)
        setIsEditing(false)
        setNameSuccess('Nome atualizado com sucesso.')

        updateProfileState({
          ...localProfile,
          name: trimmedName,
        })
      } catch (error) {
        const message = translateAuthError(error)
        if (message === 'Não foi possível entrar agora. Tente novamente em alguns instantes.') {
          setNameError('Não foi possível atualizar seu nome. Verifique sua conexão e tente novamente.')
        } else {
          setNameError(message)
        }
      } finally {
        setIsSaving(false)
      }
    },
    [user, localProfile, updateProfileState],
  )

  const openResetConfirm = useCallback(() => {
    setResetError(null)
    setResetSuccess(null)
    setShowResetConfirm(true)
  }, [])

  const closeResetConfirm = useCallback(() => {
    setShowResetConfirm(false)
    setResetError(null)
  }, [])

  const confirmReset = useCallback(async () => {
    if (!localProfile?.email) return
    setIsResetting(true)
    setResetError(null)
    setResetSuccess(null)

    try {
      await authUseCases.sendPasswordReset(localProfile.email)
      setResetSuccess('Enviamos as orientações para redefinir sua senha.')
      setShowResetConfirm(false)
    } catch (error) {
      const message = translateRecoveryError(error)
      if (message.toLowerCase().includes('conexão') || message.toLowerCase().includes('internet')) {
        setResetError('Não foi possível enviar o link. Verifique sua conexão e tente novamente.')
      } else if (message.toLowerCase().includes('muitas tentativas')) {
        setResetError('Foram realizadas muitas tentativas. Aguarde alguns minutos e tente novamente.')
      } else {
        setResetError('Não foi possível enviar o link agora. Tente novamente em alguns instantes.')
      }
    } finally {
      setIsResetting(false)
    }
  }, [localProfile])

  const openSignOutConfirm = useCallback(() => setShowSignOutConfirm(true), [])
  const closeSignOutConfirm = useCallback(() => setShowSignOutConfirm(false), [])

  const confirmSignOut = useCallback(async () => {
    try {
      await authSignOut()
      router.replace('/login')
    } catch {
      router.replace('/login')
    }
  }, [authSignOut, router])

  const openDeleteConfirm = useCallback(() => {
    setDeleteError(null)
    setShowDeleteConfirm(true)
  }, [])

  const closeDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(false)
    setDeleteError(null)
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!user) return
    setIsDeleting(true)
    setDeleteError(null)

    try {
      await authUseCases.deleteUserAccount(user.uid)
      router.replace('/login')
    } catch (error) {
      const message = translateAuthError(error)
      if (message.toLowerCase().includes('faça login novamente')) {
        setDeleteError('Por segurança, faça login novamente antes de excluir sua conta.')
      } else {
        setDeleteError('Não foi possível excluir sua conta. Tente novamente em alguns instantes.')
      }
    } finally {
      setIsDeleting(false)
    }
  }, [user, router])

  return {
    profile: localProfile,
    pageState,
    isEditing,
    isSaving,
    isResetting,
    showResetConfirm,
    showSignOutConfirm,
    nameError,
    profileError,
    resetError,
    nameSuccess,
    resetSuccess,
    originalName,
    retry,
    startEditing,
    cancelEditing,
    onNameSubmit,
    openResetConfirm,
    closeResetConfirm,
    confirmReset,
    openSignOutConfirm,
    closeSignOutConfirm,
    confirmSignOut,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
    showDeleteConfirm,
    isDeleting,
    deleteError,
    hasUnsavedChanges,
    register,
    onFormSubmit: formHandleSubmit(onNameSubmit),
    errors,
    setValue,
  }
}
