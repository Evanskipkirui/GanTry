import type { SelectHTMLAttributes, ReactNode } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  children: ReactNode
}

function Select({ label, error, id, children, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col">
      <label
        htmlFor={selectId}
        className="text-xs tracking-label uppercase text-ink-muted mb-1"
      >
        {label}
      </label>
      <select
        id={selectId}
        className={[
          'border bg-surface rounded-sm px-3 py-2 text-sm w-full text-ink outline-none',
          'focus:border-border-strong',
          error ? 'border-red' : 'border-border',
        ].join(' ')}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red mt-1">{error}</p>}
    </div>
  )
}

export default Select
