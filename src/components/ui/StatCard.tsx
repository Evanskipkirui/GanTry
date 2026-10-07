type AccentColor = 'amber' | 'green' | 'red' | 'slate'

type StatCardProps = {
  label: string
  value: string | number
  hint?: string
  accent?: AccentColor
}

const accentClasses: Record<AccentColor, string> = {
  amber: 'border-l-2 border-amber',
  green: 'border-l-2 border-green',
  red:   'border-l-2 border-red',
  slate: 'border-l-2 border-slate',
}

function StatCard({ label, value, hint, accent }: StatCardProps) {
  return (
    <div className={['border border-border bg-surface p-5', accent ? accentClasses[accent] : ''].join(' ').trim()}>
      <p className="text-xs tracking-label uppercase text-ink-muted">{label}</p>
      <p className="font-mono text-2xl lg:text-3xl text-amber mt-2">{value}</p>
      {hint && <p className="text-xs text-ink-muted mt-1">{hint}</p>}
    </div>
  )
}

export default StatCard
