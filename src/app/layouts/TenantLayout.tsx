import { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar, { type NavigationItem } from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import TenantSwitcher from '@/components/layout/TenantSwitcher'

const navItems: NavigationItem[] = [
  { label: 'Overview', path: '/tenant', enabled: true },
  { label: 'Visitors', path: '/tenant/visitors', enabled: true },
  { label: "Today's Visitors", path: '/tenant/today', enabled: true },
  { label: 'Appointments', path: '/tenant/appointments', enabled: true },
  { label: 'Employees', path: '/tenant/employees', enabled: true },
  { label: 'Visitor History', path: '/tenant/history', enabled: true },
  { label: 'Reports', path: '/tenant/reports', enabled: true },
  { label: 'Settings', path: '/tenant/settings', enabled: true },
]

function TenantLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        brand="Gantry"
        areaLabel="Tenant"
        navItems={navItems}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      >
        <TenantSwitcher />
      </Sidebar>
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          areaLabel="TENANT ADMIN"
          userLabel="TENANT ADMIN"
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

export default TenantLayout
