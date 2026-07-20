import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirebaseApp, isFirebaseConfigured } from './firebase.config'

let authInstance: ReturnType<typeof getAuth> | null = null

export function getFirebaseAuth() {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase não está configurado. Verifique suas variáveis de ambiente.'
    )
  }
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp())
    if (process.env.NEXT_PUBLIC_USE_AUTH_EMULATOR === 'true') {
      connectAuthEmulator(authInstance, 'http://localhost:9099')
    }
  }
  return authInstance
}
