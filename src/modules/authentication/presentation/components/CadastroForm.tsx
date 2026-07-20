'use client'

import { Controller } from 'react-hook-form'
import { useRegister } from '@/modules/authentication/presentation/hooks/useRegister'
import { FormField } from '@/presentation/components/forms/FormField'
import { PasswordField } from '@/presentation/components/forms/PasswordField'
import { CheckboxField } from '@/presentation/components/forms/CheckboxField'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import Link from 'next/link'

const passwordRequirements = [
  'Pelo menos 8 caracteres',
  'Pelo menos uma letra',
  'Pelo menos um número',
]

export function CadastroForm() {
  const {
    register,
    handleSubmit,
    control,
    errors,
    apiError,
    isSubmitting,
    setApiError,
  } = useRegister()

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <LiveRegion
        message={apiError || Object.values(errors).map(e => e.message).join('. ')}
        priority="assertive"
      />

      {apiError && (
        <AccessibleAlert
          variant="error"
          message={apiError}
          onClose={() => setApiError('')}
        />
      )}

      <FormField
        label="Nome completo"
        error={errors.name?.message}
        required
      >
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Digite seu nome"
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name || undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[2.75rem] transition-colors duration-normal placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary"
        />
      </FormField>

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
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[2.75rem] transition-colors duration-normal placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary"
        />
      </FormField>

      <FormField
        label="Senha"
        error={errors.password?.message}
        required
      >
        <PasswordField
          {...register('password')}
          placeholder="Crie uma senha"
          hasError={!!errors.password}
          errorId={errors.password ? 'password-error' : undefined}
          autoComplete="new-password"
          disabled={isSubmitting}
        />
        <ul className="flex flex-col gap-1 mt-2" aria-label="Requisitos da senha">
          {passwordRequirements.map((req) => (
            <li key={req} className="text-xs text-text-muted flex items-center gap-1.5">
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-text-muted shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </FormField>

      <FormField
        label="Confirmar senha"
        error={errors.confirmPassword?.message}
        required
      >
        <PasswordField
          {...register('confirmPassword')}
          placeholder="Repita a senha"
          hasError={!!errors.confirmPassword}
          errorId={errors.confirmPassword ? 'confirm-password-error' : undefined}
          autoComplete="new-password"
          disabled={isSubmitting}
        />
      </FormField>

      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          <CheckboxField
            label="Aceito os termos de uso e a política de privacidade"
            checked={field.value as boolean}
            onChange={(checked) => field.onChange(checked)}
            disabled={isSubmitting}
          />
        )}
      />

      {errors.terms && (
        <p id="terms-error" className="text-sm text-danger" role="alert">
          {errors.terms.message}
        </p>
      )}

      <LoadingButton
        type="submit"
        variant="primary"
        size="large"
        loading={isSubmitting}
        loadingText="Criando conta..."
        className="w-full"
      >
        Criar minha conta
      </LoadingButton>

      <p className="text-sm text-center text-text-secondary">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="text-primary hover:text-primary-dark underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          Entrar
        </Link>
      </p>
    </form>
  )
}
