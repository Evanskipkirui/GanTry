import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
import SearchInput from '@/components/ui/SearchInput'
import { organizations } from '@/data/organizations'
import type { Organization, Plan, OrgStatus } from '@/types/organization'

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

const columns: TableColumn<Organization>[] = [
  { key: 'name', label: 'Organization' },
  { key: 'plan', label: 'Plan', render: (row) => planBadge(row.plan) },
  { key: 'status', label: 'Status', render: (row) => statusBadge(row.status) },
  { key: 'users', label: 'Users', render: (row) => <span className="font-mono">{row.users}</span> },
  { key: 'slug', label: 'Created', render: (row) => <span className="font-mono text-xs text-ink-muted">{`2026-0${organizations.indexOf(row) + 1}-01`}</span> },
]

function Organizations() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => organizations.filter((o) =>
      o.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Organizations"
        subtitle="Manage organizations using the Gantry platform"
      />
      <div className="w-72 mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name…"
        />
      </div>
      <Table<Organization>
        columns={columns}
        rows={filtered}
        emptyMessage="No organizations match your search."
        onRowClick={(org) => navigate(`/platform/organizations/${org.slug}`)}
      />
    </div>
  )
}

export default Organizations
