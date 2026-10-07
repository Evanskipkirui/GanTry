import { useParams, useNavigate } from 'react-router'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Table, { type TableColumn } from '@/components/ui/Table'
import { organizations } from '@/data/organizations'
import { employees } from '@/data/employees'
import { visitors } from '@/data/visitors'
import type { Employee } from '@/types/employee'
import type { Visitor } from '@/types/visitor'
import { formatTime } from '@/lib/format'

const employeeColumns: TableColumn<Employee>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email', render: (row) => <span className="font-mono text-xs">{row.email}</span> },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
]

const visitorColumns: TableColumn<Visitor>[] = [
  { key: 'name', label: 'Visitor' },
  { key: 'host', label: 'Host' },
  { key: 'purpose', label: 'Purpose' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => {
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
      return <Badge variant={map[row.status]}>{labels[row.status]}</Badge>
    },
  },
  {
    key: 'checkInTime',
    label: 'Check-In',
    render: (row) => (
      <span className="font-mono text-xs">
        {row.checkInTime ? formatTime(row.checkInTime) : '—'}
      </span>
    ),
  },
]

function OrganizationDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const backButton = (
    <Button variant="secondary" onClick={() => navigate('/platform/organizations')}>
      ← Back to Organizations
    </Button>
  )

  const org = organizations.find((o) => o.slug === slug)

  if (!org) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <PageHeader title="Organization not found" />
        {backButton}
      </div>
    )
  }

  const orgEmployees = employees.filter((e) => e.tenantId === org.slug)
  const orgVisitors = visitors.filter((v) => v.tenantId === org.slug).slice(0, 10)

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title={org.name}
        subtitle={`Platform administration · ${org.slug}`}
        actions={backButton}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard label="Plan" value={org.plan.toUpperCase()} accent="amber" />
        <StatCard label="Status" value={org.status.toUpperCase()} accent="green" />
        <StatCard label="Users" value={org.users} />
        <StatCard label="Visitors" value={org.visitors} />
      </div>

      {/* Employees */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold tracking-label uppercase text-ink-muted mb-3">
          Employees
        </h2>
        <Table<Employee>
          columns={employeeColumns}
          rows={orgEmployees}
          emptyMessage="No employees for this organization."
        />
      </section>

      {/* Recent Visitors */}
      <section>
        <h2 className="text-xs font-semibold tracking-label uppercase text-ink-muted mb-3">
          Recent Visitors
        </h2>
        <Table<Visitor>
          columns={visitorColumns}
          rows={orgVisitors}
          emptyMessage="No visitors recorded for this organization."
        />
      </section>
    </div>
  )
}

export default OrganizationDetail
