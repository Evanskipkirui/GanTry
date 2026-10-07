import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="text-xs tracking-label uppercase text-ink-muted mb-1"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={[
          'border bg-surface rounded-sm px-3 py-2 text-sm w-full text-ink outline-none',
          'focus:border-border-strong',
          error ? 'border-red' : 'border-border',
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red mt-1">{error}</p>}
    </div>
  )
}

export default Input
