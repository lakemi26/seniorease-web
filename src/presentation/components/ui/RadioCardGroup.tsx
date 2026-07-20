'use client'

import { cn } from '@/shared/utils/cn'

interface RadioOption<T extends string> {
  value: T
  label: string
  description?: string
  preview?: React.ReactNode
}

interface RadioCardGroupProps<T extends string> {
  name: string
  options: RadioOption<T>[]
  value: T
  onChange: (value: T) => void
  legend: string
  className?: string
}

export function RadioCardGroup<T extends string>({
  name,
  options,
  value,
  onChange,
  legend,
  className,
}: RadioCardGroupProps<T>) {
  return (
    <fieldset className={cn('space-y-3', className)}>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer min-h-[5rem]',
                'transition-all duration-normal',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus',
                isSelected
                  ? 'border-primary bg-primary-lighter'
                  : 'border-border bg-surface hover:border-primary hover:bg-primary-lighter'
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option.value)}
                  className="mt-1 w-4 h-4 text-primary border-border focus-visible:outline-2 focus-visible:outline-focus cursor-pointer"
                  aria-describedby={option.description ? `${name}-${option.value}-desc` : undefined}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-text">
                    {option.label}
                  </span>
                  {option.description && (
                    <span
                      id={`${name}-${option.value}-desc`}
                      className="text-xs text-text-muted"
                    >
                      {option.description}
                    </span>
                  )}
                </div>
              </div>
              {option.preview && (
                <div className="mt-2" aria-hidden="true">
                  {option.preview}
                </div>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
