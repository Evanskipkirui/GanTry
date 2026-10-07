import { Suspense } from 'react'

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <span className="font-mono text-xs tracking-label uppercase text-ink-faint">
        Loading…
      </span>
    </div>
  )
}

type PageLoaderProps = {
  component: React.ComponentType
}

function PageLoader({ component: Component }: PageLoaderProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  )
}

export default PageLoader
