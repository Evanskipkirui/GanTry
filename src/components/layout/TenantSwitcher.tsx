import { useState, useRef, useEffect } from 'react'
import { useTenant } from '@/context/TenantContext'
import type { Organization } from '@/types/organization'

function TenantSwitcher() {
  const { currentTenant, setCurrentTenant, allTenants } = useTenant()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when user clicks outside
  useEffect(() => {
    if (!isOpen) return
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  function handleSelect(tenant: Organization) {
    setCurrentTenant(tenant)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="px-3 py-3 border-b border-charcoal-alt relative">
      <p className="text-xs text-charcoal-muted tracking-label uppercase mb-1">Tenant</p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-charcoal-alt px-3 py-2 rounded-sm hover:opacity-90 transition-opacity"
      >
        <span className="text-sm text-charcoal-text font-medium truncate">
          {currentTenant.name}
        </span>
        <span className="text-charcoal-muted ml-2 shrink-0">▾</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-3 right-3 top-full mt-1 bg-charcoal border border-charcoal-alt rounded-sm z-10 overflow-hidden"
        >
          {allTenants.map((tenant) => {
            const isActive = tenant.slug === currentTenant.slug
            const isPaused = tenant.status === 'paused'
            return (
              <button
                key={tenant.slug}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(tenant)}
                className={[
                  'w-full text-left px-3 py-2 text-sm flex items-center gap-2',
                  'hover:bg-charcoal-alt transition-colors',
                  isActive ? 'border-l-2 border-amber text-charcoal-text' : 'border-l-2 border-transparent text-charcoal-text',
                ].join(' ')}
              >
                <span className={isPaused ? 'text-slate' : 'text-green'}>●</span>
                <span className="truncate">{tenant.name}</span>
                {isActive && (
                  <span className="ml-auto text-amber text-xs tracking-label">active</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TenantSwitcher
