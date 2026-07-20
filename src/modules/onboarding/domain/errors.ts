export class OnboardingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OnboardingError'
  }
}

export class ProgressSaveError extends OnboardingError {
  constructor(message = 'Não foi possível salvar suas escolhas. Verifique sua conexão e tente novamente.') {
    super(message)
    this.name = 'ProgressSaveError'
  }
}
