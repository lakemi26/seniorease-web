'use client'

interface WelcomeSectionProps {
  name: string | null
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function getFirstName(fullName: string | null): string {
  if (!fullName) return 'usuário'
  return fullName.split(' ')[0]
}

export function WelcomeSection({ name }: WelcomeSectionProps) {
  const firstName = getFirstName(name)
  const greeting = getGreeting()

  return (
    <section aria-labelledby="welcome-heading">
      <h1 id="welcome-heading" className="text-3xl font-bold text-text">
        {greeting}, {firstName}.
      </h1>
      <p className="text-text-secondary mt-1">
        Veja suas próximas atividades e continue de onde parou.
      </p>
    </section>
  )
}
