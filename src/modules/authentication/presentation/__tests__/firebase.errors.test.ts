import { describe, it, expect } from 'vitest'
import { translateAuthError, translateRecoveryError, translateRegistrationError } from '@/infrastructure/firebase/firebase.errors'

describe('translateAuthError', () => {
  it('deve traduzir auth/invalid-email', () => {
    const error = { code: 'auth/invalid-email' }
    expect(translateAuthError(error)).toBe('Digite um endereço de e-mail válido.')
  })

  it('deve traduzir auth/invalid-credential', () => {
    const error = { code: 'auth/invalid-credential' }
    expect(translateAuthError(error)).toBe('Não foi possível entrar. Confira seu e-mail e sua senha.')
  })

  it('deve traduzir auth/user-disabled', () => {
    const error = { code: 'auth/user-disabled' }
    expect(translateAuthError(error)).toBe('Esta conta está temporariamente indisponível. Entre em contato com o suporte.')
  })

  it('deve traduzir auth/too-many-requests', () => {
    const error = { code: 'auth/too-many-requests' }
    expect(translateAuthError(error)).toBe('Foram realizadas muitas tentativas. Aguarde alguns minutos e tente novamente.')
  })

  it('deve traduzir auth/network-request-failed', () => {
    const error = { code: 'auth/network-request-failed' }
    expect(translateAuthError(error)).toBe('Não foi possível conectar. Verifique sua internet e tente novamente.')
  })

  it('deve retornar mensagem padrão para erro desconhecido', () => {
    const error = { code: 'auth/unknown-error' }
    expect(translateAuthError(error)).toBe('Não foi possível entrar agora. Tente novamente em alguns instantes.')
  })

  it('deve retornar mensagem padrão quando o erro não tem code', () => {
    expect(translateAuthError(new Error('erro qualquer'))).toBe('Não foi possível entrar agora. Tente novamente em alguns instantes.')
  })
})

describe('translateRecoveryError', () => {
  it('deve retornar mensagem padrão de recovery para erro desconhecido', () => {
    const error = { code: 'auth/unknown' }
    expect(translateRecoveryError(error)).toBe('Não foi possível enviar as instruções. Tente novamente em alguns instantes.')
  })
})

describe('translateRegistrationError', () => {
  it('deve traduzir auth/email-already-in-use', () => {
    const error = { code: 'auth/email-already-in-use' }
    expect(translateRegistrationError(error)).toBe('Já existe uma conta com este e-mail. Entre com sua senha ou recupere o acesso.')
  })

  it('deve traduzir auth/invalid-email', () => {
    const error = { code: 'auth/invalid-email' }
    expect(translateRegistrationError(error)).toBe('Digite um endereço de e-mail válido.')
  })

  it('deve traduzir auth/weak-password', () => {
    const error = { code: 'auth/weak-password' }
    expect(translateRegistrationError(error)).toBe('Crie uma senha com pelo menos 8 caracteres, incluindo uma letra e um número.')
  })

  it('deve traduzir auth/network-request-failed', () => {
    const error = { code: 'auth/network-request-failed' }
    expect(translateRegistrationError(error)).toBe('Não foi possível conectar. Verifique sua internet e tente novamente.')
  })

  it('deve retornar mensagem padrão para erro desconhecido', () => {
    const error = { code: 'auth/unknown' }
    expect(translateRegistrationError(error)).toBe('Não foi possível criar sua conta agora. Tente novamente em alguns instantes.')
  })

  it('deve retornar mensagem padrão quando o erro não tem code', () => {
    expect(translateRegistrationError(new Error('erro'))).toBe('Não foi possível criar sua conta agora. Tente novamente em alguns instantes.')
  })
})
