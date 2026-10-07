import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
import { organizations } from '@/data/organizations'
import type { Organization, Plan, OrgStatus } from '@/types/organization'
import { formatDateTime } from '@/lib/format'

const planBadge = (plan: Plan) => {
  const map: Record<Plan, 'amber' | 'green' | 'neutral'> = {
    enterprise: 'amber',
    pro: 'green',
    starter: 'neutral',
  }
  return <Badge variant={map[plan]}>{plan}</Badge>
}

const statusBadge = (status: OrgStatus) => (
  <Badge variant={status === 'active' ? 'green' : 'red'}>{status}</Badge>
)

const orgColumns: TableColumn<Organization>[] = [
  { key: 'name', label: 'Organization' },
  { key: 'plan', label: 'Plan', render: (row) => planBadge(row.plan) },
  { key: 'status', label: 'Status', render: (row) => statusBadge(row.status) },
  { key: 'users', label: 'Users', render: (row) => <span className="font-mono">{row.users}</span> },
]

type ActivityEntry = {
  id: string
  time: string
  user: string
  action: string
  organization: string
}

const activityColumns: TableColumn<ActivityEntry>[] = [
  { key: 'time', label: 'Time', render: (row) => <span className="font-mono text-xs">{formatDateTime(row.time)}</span> },
  { key: 'user', label: 'User' },
  { key: 'action', label: 'Action' },
  { key: 'organization', label: 'Organization' },
]

const recentActivity: ActivityEntry[] = [
  { id: 'a1', time: '2026-10-05T09:12:00', user: 'admin@gantry.io', action: 'Organization created', organization: 'Delta Consulting Group' },
  { id: 'a2', time: '2026-10-05T08:47:00', user: 'admin@gantry.io', action: 'User invited', organization: 'Acme Technologies' },
  { id: 'a3', time: '2026-10-04T16:30:00', user: 'admin@gantry.io', action: 'Subscription changed', organization: 'Beta Solutions Ltd' },
  { id: 'a4', time: '2026-10-04T14:15:00', user: 'admin@gantry.io', action: 'Organization paused', organization: 'Epsilon Enterprises' },
  { id: 'a5', time: '2026-10-03T11:00:00', user: 'admin@gantry.io', action: 'Organization created', organization: 'Gamma Logistics' },
]

function PlatformDashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader title="Platform Overview" subtitle="Gantry platform administration" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Organizations" value={6} />
        <StatCard label="Active Organizations" value={4} />
        <StatCard label="Platform Users" value={18} />
        <StatCard label="Visitors Today" value={48} />
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-ink tracking-tight mb-3">Organizations</h2>
        <Table<Organization> columns={orgColumns} rows={organizations} />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-ink tracking-tight mb-3">Recent Activity</h2>
        <Table<ActivityEntry> columns={activityColumns} rows={recentActivity} />
      </section>
    </div>
  )
}

export default PlatformDashboard
