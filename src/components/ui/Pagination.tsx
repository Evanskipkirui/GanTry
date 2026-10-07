import Button from '@/components/ui/Button'

type PaginationProps = {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
}

function Pagination({ page, totalPages, onPrev, onNext, canPrev, canNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <Button variant="secondary" size="sm" onClick={onPrev} disabled={!canPrev}>
        Previous
      </Button>
      <span className="font-mono text-xs tracking-label text-ink-muted">
        {page} / {totalPages}
      </span>
      <Button variant="secondary" size="sm" onClick={onNext} disabled={!canNext}>
        Next
      </Button>
    </div>
  )
}

export default Pagination
