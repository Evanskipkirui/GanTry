import type { ReactNode } from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'featured'
  size?: 'sm' | 'md'
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses = {
  primary: 'bg-amber text-white hover:opacity-90',
  secondary: 'border border-border bg-surface text-ink hover:bg-surface-alt',
  ghost: 'text-ink-muted hover:bg-surface-alt',
  featured: 'bg-amber text-white hover:opacity-90 shadow-sm font-semibold',
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
}

function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'font-medium rounded-sm transition-opacity',
        variantClasses[variant],
        variant === 'featured' ? 'px-4 py-2.5 text-sm' : sizeClasses[size],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default Button
