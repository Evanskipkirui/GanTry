import { lazy } from 'react'

// Platform
export const PlatformDashboard          = lazy(() => import('@/pages/platform/Dashboard'))
export const PlatformOrganizations      = lazy(() => import('@/pages/platform/Organizations'))
export const PlatformOrganizationDetail = lazy(() => import('@/pages/platform/OrganizationDetail'))
export const PlatformUsers              = lazy(() => import('@/pages/platform/Users'))
export const PlatformActivity           = lazy(() => import('@/pages/platform/Activity'))
export const PlatformSettings           = lazy(() => import('@/pages/platform/Settings'))

// Tenant
export const TenantDashboard = lazy(() => import('@/pages/tenant/Dashboard'))
export const Visitors        = lazy(() => import('@/pages/tenant/Visitors'))
export const RegisterVisitor = lazy(() => import('@/pages/tenant/RegisterVisitor'))
export const TodayVisitors   = lazy(() => import('@/pages/tenant/TodayVisitors'))
export const Appointments    = lazy(() => import('@/pages/tenant/Appointments'))
export const Employees       = lazy(() => import('@/pages/tenant/Employees'))
export const TenantReports   = lazy(() => import('@/pages/tenant/Reports'))
export const TenantSettings  = lazy(() => import('@/pages/tenant/Settings'))
export const TenantHistory   = lazy(() => import('@/pages/tenant/History'))
export const NotFound        = lazy(() => import('@/pages/NotFound'))

// Staff
export const StaffDashboard       = lazy(() => import('@/pages/staff/Dashboard'))
export const StaffTodayVisitors   = lazy(() => import('@/pages/staff/TodayVisitors'))
export const StaffRegisterVisitor = lazy(() => import('@/pages/staff/RegisterVisitor'))
export const StaffHistory         = lazy(() => import('@/pages/staff/History'))
