'use client'

import { useLogin } from '@/modules/authentication/presentation/hooks/useLogin'
import { FormField } from '@/presentation/components/forms/FormField'
import { PasswordField } from '@/presentation/components/forms/PasswordField'
import { CheckboxField } from '@/presentation/components/forms/CheckboxField'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    errors,
    apiError,
    isSubmitting,
    setApiError,
    rememberMe,
    setRememberMe,
  } = useLogin()

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <LiveRegion message={apiError || Object.values(errors).map(e => e.message).join('. ')} priority="assertive" />

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
          placeholder="Digite sua senha"
          hasError={!!errors.password}
          errorId={errors.password ? 'password-error' : undefined}
          autoComplete="current-password"
          disabled={isSubmitting}
        />
      </FormField>

      <CheckboxField
        label="Continuar conectado"
        description="Mantenha sua sessão ativa neste dispositivo."
        checked={rememberMe}
        onChange={(checked) => setRememberMe(checked)}
        disabled={isSubmitting}
      />

      <div className="flex flex-col gap-3">
        <LoadingButton
          type="submit"
          variant="primary"
          size="large"
          loading={isSubmitting}
          loadingText="Entrando..."
          className="w-full"
        >
          Entrar
        </LoadingButton>
      </div>

      <div className="flex flex-col items-center gap-3">
        <a
          href="/recuperar-senha"
          className="text-sm text-primary hover:text-primary-dark underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          Esqueci minha senha
        </a>

        <p className="text-sm text-text-secondary">
          Não tem uma conta?{' '}
          <a
            href="/cadastro"
            className="text-primary hover:text-primary-dark underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
          >
            Criar conta
          </a>
        </p>
      </div>
    </form>
  )
}
