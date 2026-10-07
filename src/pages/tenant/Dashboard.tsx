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
    key: 'status',
    label: 'Status',
    render: (row) => statusBadge(row.status),
  },
]

function TenantDashboard() {
  const { currentTenant } = useTenant()
  const onSite = useVisitors({ tenantSlug: currentTenant.slug, status: 'checked-in' })

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Dashboard" subtitle={currentTenant.name} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Today's Visitors" value={48} />
        <StatCard label="On-Site" value={17} accent="amber" />
        <StatCard label="Expected" value={23} />
        <StatCard label="Checked Out" value={8} accent="red" />
      </div>

      <section>
        <h2 className="text-sm font-semibold text-ink tracking-tight mb-3">
          Currently On-Site
        </h2>
        <Table<Visitor>
          columns={columns}
          rows={onSite}
          emptyMessage="No visitors currently on-site."
        />
      </section>
    </div>
  )
}

export default TenantDashboard
