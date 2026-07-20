'use client'

import { usePasswordRecovery } from '@/modules/authentication/presentation/hooks/usePasswordRecovery'
import { FormField } from '@/presentation/components/forms/FormField'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

export function PasswordRecoveryForm() {
  const {
    register,
    handleSubmit,
    errors,
    apiError,
    isSubmitted,
    isSubmitting,
    setApiError,
  } = usePasswordRecovery()

  if (isSubmitted) {
    return (
      <div className="flex flex-col gap-4">
        <AccessibleAlert
          variant="success"
          message="Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha."
        />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <LiveRegion message={apiError || errors.email?.message || ''} priority="assertive" />

      {apiError && (
        <AccessibleAlert
          variant="error"
          message={apiError}
          onClose={() => setApiError('')}
        />
      )}

      <FormField
        label="E-mail"
        error={errors.email?.message}
        required
      >
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email || undefined}
          className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[2.75rem] transition-colors duration-normal placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary"
        />
      </FormField>

      <LoadingButton
        type="submit"
        variant="primary"
        size="large"
        loading={isSubmitting}
        loadingText="Enviando..."
        className="w-full"
      >
        Enviar instruções
      </LoadingButton>
    </form>
  )
}
