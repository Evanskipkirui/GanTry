import { createContext, useContext } from 'react'
import type { Organization } from '@/types/organization'

export type TenantContextValue = {
  currentTenant: Organization
  setCurrentTenant: (tenant: Organization) => void
  allTenants: Organization[]
}

export const TenantContext = createContext<TenantContextValue | undefined>(undefined)

export function useTenant(): TenantContextValue {
  const ctx = useContext(TenantContext)
  if (ctx === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return ctx
}
