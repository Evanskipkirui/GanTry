import { useState, useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
import SearchInput from '@/components/ui/SearchInput'
import type { Visitor } from '@/types/visitor'
import { formatTime } from '@/lib/format'
import { useTenant } from '@/context/TenantContext'
import useVisitors from '@/hooks/useVisitors'

const statusBadge = (status: Visitor['status']) => {
  const map: Record<Visitor['status'], 'green' | 'amber' | 'neutral' | 'red'> = {
    'checked-in': 'green',
    'expected': 'amber',
    'checked-out': 'neutral',
    'cancelled': 'red',
  }
  const labels: Record<Visitor['status'], string> = {
    'checked-in': 'On-Site',
    'expected': 'Expected',
    'checked-out': 'Checked Out',
    'cancelled': 'Cancelled',
  }
  return <Badge variant={map[status]}>{labels[status]}</Badge>
}

const columns: TableColumn<Visitor>[] = [
  { key: 'name', label: 'Visitor' },
  { key: 'host', label: 'Host' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'status', label: 'Status', render: (row) => statusBadge(row.status) },
  {
    key: 'expectedTime',
    label: 'Time',
    render: (row) => <span className="font-mono text-xs">{formatTime(row.expectedTime)}</span>,
  },
]

function TodayVisitors() {
  const { currentTenant } = useTenant()
  const [search, setSearch] = useState('')

  // Get tenant visitors (excluding cancelled), then apply search
  const tenantVisitors = useVisitors({ tenantSlug: currentTenant.slug })
  const filtered = useMemo(
    () => tenantVisitors
      .filter((v) => v.status !== 'cancelled')
      .filter((v) => v.name.toLowerCase().includes(search.toLowerCase())),
    [tenantVisitors, search],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Today's Visitors"
        subtitle="Visitor check-in and check-out activity"
      />
      <div className="w-64 mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by visitor name…"
        />
      </div>
      <Table<Visitor>
        columns={columns}
        rows={filtered}
        emptyMessage="No visitors found."
      />
    </div>
  )
}

export default TodayVisitors
