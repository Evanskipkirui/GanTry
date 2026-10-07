import type { ReactNode } from 'react'

type BadgeVariant = 'green' | 'red' | 'slate' | 'amber' | 'neutral'

type BadgeProps = {
  variant: BadgeVariant
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-green-light text-green',
  red: 'bg-red-light text-red',
  slate: 'bg-surface-alt text-slate',
  amber: 'bg-amber-light text-amber',
  neutral: 'bg-surface-alt text-ink-muted',
}

function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block font-mono text-xs tracking-label uppercase px-2 py-0.5 rounded-sm',
        variantClasses[variant],
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default Badge
