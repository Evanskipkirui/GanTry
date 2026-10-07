import { NavLink } from 'react-router'
import type { ReactNode } from 'react'

export type NavigationItem = {
  label: string
  path: string
  enabled?: boolean
}

type SidebarProps = {
  brand: string
  areaLabel: string
  navItems: NavigationItem[]
  children?: ReactNode
  mobileOpen?: boolean
  onMobileClose?: () => void
}

function Sidebar({ brand, areaLabel, navItems, children, mobileOpen, onMobileClose }: SidebarProps) {
  const asideClass = [
    'flex flex-col w-60 shrink-0 bg-charcoal min-h-screen',
    // On mobile/tablet: fixed drawer, only visible when mobileOpen
    // On desktop: static, always visible
    'fixed inset-y-0 left-0 z-50 lg:static lg:z-auto',
    mobileOpen ? 'flex' : 'hidden lg:flex',
  ].join(' ')

  return (
    <>
      {/* Backdrop — only on mobile when open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside className={asideClass}>
        {/* Brand */}
        <div className="px-5 py-4 border-b border-charcoal-alt">
          <span className="font-mono text-sm font-bold tracking-label text-amber uppercase">
            {brand}
          </span>
          <p className="mt-0.5 text-xs text-charcoal-muted tracking-label uppercase">
            {areaLabel}
          </p>
        </div>

        {/* Optional slot (e.g. TenantSwitcher) */}
        {children}

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 px-3 py-4">
          {navItems.map((item) =>
            item.enabled ? (
              <NavLink
                key={item.label}
                to={item.path}
                end
                onClick={onMobileClose}
                className={({ isActive }) =>
                  [
                    'px-3 py-2 text-sm rounded-sm transition-colors',
                    isActive
                      ? 'bg-charcoal-alt text-charcoal-text border-l-2 border-amber'
                      : 'text-charcoal-text hover:bg-charcoal-alt',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <div
                key={item.label}
                className="px-3 py-2 text-sm text-charcoal-muted opacity-50 select-none"
              >
                {item.label}
              </div>
            )
          )}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
