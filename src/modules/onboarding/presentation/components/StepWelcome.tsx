'use client'

import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'

interface StepWelcomeProps {
  onStart: () => void
}

export function StepWelcome({ onStart }: StepWelcomeProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-2xl font-bold text-text focus-visible:outline-none"
        tabIndex={-1}
        ref={(el) => el?.focus()}
      >
        Vamos preparar o SeniorEase para você.
      </h2>

      <p className="text-text-secondary text-base leading-relaxed">
        Você poderá escolher como os textos, os espaços e as confirmações aparecerão durante o uso. Essas opções poderão ser alteradas novamente quando desejar.
      </p>

      <div className="bg-primary-lighter rounded-lg p-4 space-y-2">
        <p className="text-sm text-primary-dark font-medium">
          Esse processo possui <strong>seis etapas</strong>:
        </p>
        <ul className="text-sm text-primary-dark space-y-1 list-disc list-inside">
          <li>nenhuma escolha é permanente</li>
          <li>você poderá voltar e alterar</li>
          <li>as configurações serão salvas no seu perfil</li>
        </ul>
      </div>

      <div className="pt-4">
        <LoadingButton
          type="button"
          variant="primary"
          size="large"
          onClick={onStart}
          className="w-full sm:w-auto"
        >
          Começar configuração
        </LoadingButton>
      </div>
    </div>
  )
}
