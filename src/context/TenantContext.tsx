import { useState } from 'react'
import type { ReactNode } from 'react'
import { organizations } from '@/data/organizations'
import type { Organization } from '@/types/organization'
import { TenantContext } from '@/context/TenantContext.ts'

const defaultTenant: Organization =
  organizations.find((org) => org.slug === 'acme') ?? organizations[0]

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Organization>(defaultTenant)

  return (
    <TenantContext.Provider
      value={{ currentTenant, setCurrentTenant, allTenants: organizations }}
    >
      {children}
    </TenantContext.Provider>
  )
}
