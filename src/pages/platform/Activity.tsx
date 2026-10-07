import { useState, useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
import Select from '@/components/ui/Select'
import { formatDateTime } from '@/lib/format'

type ActivityStatus = 'success' | 'warning'

type ActivityEntry = {
  id: string
  time: string
  user: string
  action: string
  organization: string
  status: ActivityStatus
}

const activityLog: ActivityEntry[] = [
  { id: 'al-01', time: '2026-10-05T09:12:00', user: 'admin@gantry.io', action: 'Organization created', organization: 'Delta Consulting Group', status: 'success' },
  { id: 'al-02', time: '2026-10-05T08:47:00', user: 'admin@gantry.io', action: 'User invited', organization: 'Acme Technologies', status: 'success' },
  { id: 'al-03', time: '2026-10-05T08:10:00', user: 'admin@gantry.io', action: 'Subscription changed', organization: 'Beta Solutions Ltd', status: 'success' },
  { id: 'al-04', time: '2026-10-04T16:30:00', user: 'admin@gantry.io', action: 'Organization paused', organization: 'Epsilon Enterprises', status: 'warning' },
  { id: 'al-05', time: '2026-10-04T14:15:00', user: 'admin@gantry.io', action: 'User deactivated', organization: 'Epsilon Enterprises', status: 'warning' },
  { id: 'al-06', time: '2026-10-04T11:05:00', user: 'admin@gantry.io', action: 'Organization created', organization: 'Gamma Logistics', status: 'success' },
  { id: 'al-07', time: '2026-10-03T15:40:00', user: 'admin@gantry.io', action: 'User invited', organization: 'Gamma Logistics', status: 'success' },
  { id: 'al-08', time: '2026-10-03T10:00:00', user: 'admin@gantry.io', action: 'Organization paused', organization: 'Zeta Capital Partners', status: 'warning' },
  { id: 'al-09', time: '2026-10-02T09:30:00', user: 'admin@gantry.io', action: 'Subscription changed', organization: 'Acme Technologies', status: 'success' },
  { id: 'al-10', time: '2026-10-01T14:00:00', user: 'admin@gantry.io', action: 'Organization created', organization: 'Zeta Capital Partners', status: 'success' },
]

const columns: TableColumn<ActivityEntry>[] = [
  { key: 'time', label: 'Time', render: (row) => <span className="font-mono text-xs">{formatDateTime(row.time)}</span> },
  { key: 'user', label: 'User', render: (row) => <span className="font-mono text-xs">{row.user}</span> },
  { key: 'action', label: 'Action' },
  { key: 'organization', label: 'Organization' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge variant={row.status === 'success' ? 'green' : 'amber'}>{row.status}</Badge>
    ),
  },
]

function Activity() {
  const [statusFilter, setStatusFilter] = useState<ActivityStatus | 'all'>('all')

  const filtered = useMemo(
    () => statusFilter === 'all'
      ? activityLog
      : activityLog.filter((e) => e.status === statusFilter),
    [statusFilter],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Activity Log"
        subtitle="Platform events and administrative activity"
      />
      <div className="w-48 mb-5">
        <Select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ActivityStatus | 'all')}
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
        </Select>
      </div>
      <Table<ActivityEntry>
        columns={columns}
        rows={filtered}
        emptyMessage="No activity matches the current filter."
      />
    </div>
  )
}

export default Activity
