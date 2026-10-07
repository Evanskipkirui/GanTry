import { createBrowserRouter, Navigate } from 'react-router'

import PlatformLayout from '@/app/layouts/PlatformLayout'
import TenantLayout from '@/app/layouts/TenantLayout'
import StaffLayout from '@/app/layouts/StaffLayout'
import PageLoader from '@/app/router/PageLoader'

import {
  PlatformDashboard,
  PlatformOrganizations,
  PlatformOrganizationDetail,
  PlatformUsers,
  PlatformActivity,
  PlatformSettings,
  TenantDashboard,
  Visitors,
  RegisterVisitor,
  TodayVisitors,
  Appointments,
  Employees,
  TenantReports,
  TenantSettings,
  TenantHistory,
  NotFound,
  StaffDashboard,
  StaffTodayVisitors,
  StaffRegisterVisitor,
  StaffHistory,
} from '@/app/router/lazyPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/platform" replace />,
  },
  {
    path: '/platform',
    element: <PlatformLayout />,
    children: [
      { index: true,                element: <PageLoader component={PlatformDashboard} /> },
      { path: 'organizations',      element: <PageLoader component={PlatformOrganizations} /> },
      { path: 'organizations/:slug', element: <PageLoader component={PlatformOrganizationDetail} /> },
      { path: 'users',              element: <PageLoader component={PlatformUsers} /> },
      { path: 'activity',           element: <PageLoader component={PlatformActivity} /> },
      { path: 'settings',           element: <PageLoader component={PlatformSettings} /> },
    ],
  },
  {
    path: '/tenant',
    element: <TenantLayout />,
    children: [
      { index: true,          element: <PageLoader component={TenantDashboard} /> },
      { path: 'visitors',     element: <PageLoader component={Visitors} /> },
      { path: 'register',     element: <PageLoader component={RegisterVisitor} /> },
      { path: 'today',        element: <PageLoader component={TodayVisitors} /> },
      { path: 'appointments', element: <PageLoader component={Appointments} /> },
      { path: 'employees',    element: <PageLoader component={Employees} /> },
      { path: 'reports',      element: <PageLoader component={TenantReports} /> },
      { path: 'settings',     element: <PageLoader component={TenantSettings} /> },
      { path: 'history',      element: <PageLoader component={TenantHistory} /> },
    ],
  },
  {
    path: '/staff',
    element: <StaffLayout />,
    children: [
      { index: true,      element: <PageLoader component={StaffDashboard} /> },
      { path: 'today',    element: <PageLoader component={StaffTodayVisitors} /> },
      { path: 'register', element: <PageLoader component={StaffRegisterVisitor} /> },
      { path: 'history',  element: <PageLoader component={StaffHistory} /> },
    ],
  },
  {
    path: '*',
    element: <PageLoader component={NotFound} />,
  },
])
