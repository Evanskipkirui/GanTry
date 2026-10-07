import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar, { type NavigationItem } from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

const navItems: NavigationItem[] = [
  { label: 'Overview', path: '/staff', enabled: true },
  { label: "Today's Visitors", path: '/staff/today', enabled: true },
  { label: 'Register Visitor', path: '/staff/register', enabled: true },
  { label: 'History', path: '/staff/history', enabled: true },
]

function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        brand="Gantry"
        areaLabel="Staff"
        navItems={navItems}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          areaLabel="STAFF"
          userLabel="RECEPTION"
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

export default StaffLayout
