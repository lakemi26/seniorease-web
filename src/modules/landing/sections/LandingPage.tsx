import { SkipLink } from '@/presentation/components/accessibility/SkipLink'
import { Navbar } from '@/presentation/components/layout/Navbar'
import { Hero } from '@/modules/landing/components/Hero'
import { BenefitsSection } from '@/modules/landing/components/BenefitsSection'
import { HowItWorksSection } from '@/modules/landing/components/HowItWorksSection'
import { DemoSection } from '@/modules/landing/components/DemoSection'
import { ControlSection } from '@/modules/landing/components/ControlSection'
import { AccessibilitySectionComponent } from '@/modules/landing/components/AccessibilitySection'
import { FAQSection } from '@/modules/landing/components/FAQSection'
import { CTASection } from '@/modules/landing/components/CTASection'
import { Footer } from '@/presentation/components/layout/Footer'

export function LandingPage() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Hero />
        <BenefitsSection />
        <HowItWorksSection />
        <DemoSection />
        <ControlSection />
        <AccessibilitySectionComponent />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
