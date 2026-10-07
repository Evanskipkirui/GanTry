import { useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
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
    key: 'status',
    label: 'Status',
    render: (row) => {
      const map: Record<string, 'green' | 'amber'> = {
        'checked-in': 'green',
        'expected': 'amber',
      }
      const labels: Record<string, string> = {
        'checked-in': 'On-Site',
        'expected': 'Expected',
      }
      return <Badge variant={map[row.status]}>{labels[row.status]}</Badge>
    },
  },
  {
    key: 'expectedTime',
    label: 'Time',
    render: (row) => (
      <span className="font-mono text-xs">{formatTime(row.expectedTime)}</span>
    ),
  },
]

function TodayVisitors() {
  const { currentTenant } = useTenant()
  // Get all tenant visitors, then keep only active/expected
  const tenantVisitors = useVisitors({ tenantSlug: currentTenant.slug })
  const todayVisitors = useMemo(
    () => tenantVisitors.filter((v) => v.status === 'checked-in' || v.status === 'expected'),
    [tenantVisitors],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Today's Visitors"
        subtitle="Expected and active visitors for today"
      />
      <Table<Visitor>
        columns={columns}
        rows={todayVisitors}
        emptyMessage="No active or expected visitors today."
      />
    </div>
  )
}

export default TodayVisitors
