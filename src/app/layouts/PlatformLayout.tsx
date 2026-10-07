import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar, { type NavigationItem } from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

const navItems: NavigationItem[] = [
  { label: 'Overview', path: '/platform', enabled: true },
  { label: 'Organizations', path: '/platform/organizations', enabled: true },
  { label: 'Users', path: '/platform/users', enabled: true },
  { label: 'Activity Log', path: '/platform/activity', enabled: true },
  { label: 'Settings', path: '/platform/settings', enabled: true },
]

function PlatformLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        brand="Gantry"
        areaLabel="Platform"
        navItems={navItems}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          areaLabel="PLATFORM ADMIN"
          userLabel="ADMIN"
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 bg-paper overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default PlatformLayout
