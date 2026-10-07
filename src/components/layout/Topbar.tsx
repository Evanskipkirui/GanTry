type TopbarProps = {
  areaLabel: string
  userLabel: string
  onMenuClick?: () => void
}

function Topbar({ areaLabel, userLabel, onMenuClick }: TopbarProps) {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-surface border-b border-border">
      <div className="flex items-center">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden text-ink-muted hover:text-ink mr-3 text-lg leading-none"
            aria-label="Open navigation"
          >
            ☰
          </button>
        )}
        <span className="font-mono text-xs tracking-label uppercase text-ink-muted">
          {areaLabel}
        </span>
      </div>
      <span className="hidden sm:inline-flex font-mono text-xs tracking-label uppercase text-ink-muted border border-border px-2 py-1 rounded-sm">
        {userLabel}
      </span>
    </header>
  )
}

export default Topbar
