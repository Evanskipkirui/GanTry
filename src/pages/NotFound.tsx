import { useNavigate } from 'react-router'
import Button from '@/components/ui/Button'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="bg-surface border border-border p-12 rounded-sm max-w-md w-full text-center">
        <p className="font-mono text-3xl text-ink-muted tracking-label">404</p>
        <h1 className="text-xl font-semibold text-ink tracking-tight mt-4">
          Page not found
        </h1>
        <p className="text-sm text-ink-muted mt-2">
          The page you are looking for does not exist.
        </p>
        <div className="flex gap-2 justify-center mt-6">
          <Button variant="primary" onClick={() => navigate('/platform')}>
            Go to Platform
          </Button>
          <Button variant="secondary" onClick={() => navigate('/tenant')}>
            Go to Tenant
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
