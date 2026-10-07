import { useMemo } from 'react'
import { visitors } from '@/data/visitors'
import type { Visitor, VisitorStatus } from '@/types/visitor'

type UseVisitorsOptions = {
  tenantSlug: string
  status?: VisitorStatus | 'all'
  search?: string
}

function useVisitors({ tenantSlug, status, search }: UseVisitorsOptions): Visitor[] {
  return useMemo(() => {
    let result = visitors.filter((v) => v.tenantId === tenantSlug)

    if (status && status !== 'all') {
      result = result.filter((v) => v.status === status)
    }

    if (search) {
      const lower = search.toLowerCase()
      result = result.filter((v) => v.name.toLowerCase().includes(lower))
    }

    return result
  }, [tenantSlug, status, search])
}

export default useVisitors
