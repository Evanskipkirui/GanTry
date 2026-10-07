import PageHeader from '@/components/ui/PageHeader'
import Table, { type TableColumn } from '@/components/ui/Table'
import type { Visitor } from '@/types/visitor'
import { formatTime } from '@/lib/format'
import { useTenant } from '@/context/TenantContext'
import useVisitors from '@/hooks/useVisitors'

const columns: TableColumn<Visitor>[] = [
  { key: 'name', label: 'Visitor' },
  { key: 'host', label: 'Host' },
  { key: 'purpose', label: 'Purpose' },
  {
    key: 'checkInTime',
    label: 'Check-In',
    render: (row) => (
      <span className="font-mono text-xs">
        {row.checkInTime ? formatTime(row.checkInTime) : '—'}
      </span>
    ),
  },
  {
    key: 'checkOutTime',
    label: 'Check-Out',
    render: (row) => (
      <span className="font-mono text-xs">
        {row.checkOutTime ? formatTime(row.checkOutTime) : '—'}
      </span>
    ),
  },
]

function History() {
  const { currentTenant } = useTenant()
  const historyVisitors = useVisitors({ tenantSlug: currentTenant.slug, status: 'checked-out' })

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Visitor History"
        subtitle={`Past visitors for ${currentTenant.name}`}
      />
      <Table<Visitor>
        columns={columns}
        rows={historyVisitors}
        emptyMessage="No visitor history for this organization."
      />
    </div>
  )
}

export default History
