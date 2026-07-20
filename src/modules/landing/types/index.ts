export interface BenefitItem {
  icon: string
  title: string
  description: string
}

export interface HowItWorksStep {
  stepNumber: number
  title: string
  description: string
}

export interface FAQQuestion {
  question: string
  answer: string
}

export interface AccessibilityFeatureItem {
  icon: string
  title: string
  description: string
}

export interface DemoControlOption<T = string> {
  value: T
  label: string
}

export interface DemoControlGroup {
  id: string
  label: string
  options: DemoControlOption[]
}
