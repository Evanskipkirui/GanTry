import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
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

function StaffDashboard() {
  const { currentTenant } = useTenant()
  const tenantVisitors = useVisitors({ tenantSlug: currentTenant.slug })

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Reception Dashboard"
        subtitle={`${currentTenant.name} · Front Desk`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Expected Today" value={23} accent="amber" />
        <StatCard label="Checked In" value={17} accent="green" />
        <StatCard label="Checked Out" value={8} accent="red" />
        <StatCard label="Total Today" value={48} />
      </div>

      <section>
        <h2 className="text-sm font-semibold text-ink tracking-tight mb-3">
          Today's Visitor Activity
        </h2>
        <Table<Visitor>
          columns={columns}
          rows={tenantVisitors}
          emptyMessage="No visitor activity today."
        />
      </section>
    </div>
  )
}

export default StaffDashboard
