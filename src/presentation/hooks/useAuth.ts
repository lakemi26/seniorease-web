'use client'

import { useContext } from 'react'
import { AuthContext } from '@/presentation/providers/AuthProvider'
import type { AuthContextType } from '@/presentation/providers/AuthProvider'

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
