type EmptyStateProps = {
  title: string
  description?: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-border p-8 text-center">
      <p className="text-sm font-medium text-ink">{title}</p>
      {description && <p className="text-xs text-ink-muted mt-1">{description}</p>}
    </div>
  )
}

export default EmptyState
