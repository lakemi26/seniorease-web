import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFirebaseApp, isFirebaseConfigured } from './firebase.config'

let firestoreInstance: ReturnType<typeof getFirestore> | null = null

export function getFirebaseFirestore() {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase não está configurado. Verifique suas variáveis de ambiente.'
    )
  }
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(getFirebaseApp())
    if (process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR === 'true') {
      connectFirestoreEmulator(firestoreInstance, 'http://localhost', 8080)
    }
  }
  return firestoreInstance
}
