import { useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import Table, { type TableColumn } from '@/components/ui/Table'
import { visitors } from '@/data/visitors'
import { useTenant } from '@/context/TenantContext'

type HostRow = {
  host: string
  total: number
  checkedIn: number
  checkedOut: number
}

const hostColumns: TableColumn<HostRow>[] = [
  { key: 'host', label: 'Host' },
  { key: 'total', label: 'Total Visitors', render: (row) => <span className="font-mono">{row.total}</span> },
  { key: 'checkedIn', label: 'Checked In', render: (row) => <span className="font-mono">{row.checkedIn}</span> },
  { key: 'checkedOut', label: 'Checked Out', render: (row) => <span className="font-mono">{row.checkedOut}</span> },
]

function Reports() {
  const { currentTenant } = useTenant()

  const tenantVisitors = useMemo(
    () => visitors.filter((v) => v.tenantId === currentTenant.slug),
    [currentTenant.slug],
  )

  const total = tenantVisitors.length
  const checkedIn = tenantVisitors.filter((v) => v.status === 'checked-in').length
  const checkedOut = tenantVisitors.filter((v) => v.status === 'checked-out').length
  const expected = tenantVisitors.filter((v) => v.status === 'expected').length

  const hostRows = useMemo(() => {
    const map = new Map<string, HostRow>()
    for (const v of tenantVisitors) {
      const existing = map.get(v.host) ?? { host: v.host, total: 0, checkedIn: 0, checkedOut: 0 }
      existing.total += 1
      if (v.status === 'checked-in') existing.checkedIn += 1
      if (v.status === 'checked-out') existing.checkedOut += 1
      map.set(v.host, existing)
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total)
  }, [tenantVisitors])

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Reports"
        subtitle={`${currentTenant.name} · Visitor analytics`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Total Visitors" value={total} />
        <StatCard label="Checked In" value={checkedIn} />
        <StatCard label="Checked Out" value={checkedOut} />
        <StatCard label="Expected" value={expected} />
      </div>

      <section>
        <h2 className="text-xs font-semibold tracking-label uppercase text-ink-muted mb-3">
          Visitors by Host
        </h2>
        <Table<HostRow>
          columns={hostColumns}
          rows={hostRows}
          emptyMessage="No visitor data for this organization."
        />
      </section>
    </div>
  )
}

export default Reports
