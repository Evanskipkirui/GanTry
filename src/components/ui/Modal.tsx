import type { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
}

function Modal({ open, onClose, title, children, actions }: ModalProps) {
  if (!open) return null

  const titleId = 'modal-title'

  return (
    <div
      className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-surface border border-border rounded-sm max-w-md w-full p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id={titleId}
          className="text-lg font-semibold tracking-tight text-ink mb-4"
        >
          {title}
        </h2>

        <div className="text-sm text-ink-muted">{children}</div>

        {actions && (
          <div className="flex gap-2 justify-end mt-6">{actions}</div>
        )}
      </div>
    </div>
  )
}

export default Modal
