import { useState, useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
import SearchInput from '@/components/ui/SearchInput'

type PlatformUser = {
  id: string
  name: string
  email: string
  organization: string
  role: string
  status: 'active' | 'inactive'
}

const platformUsers: PlatformUser[] = [
  { id: 'u-001', name: 'Grace Wanjiku', email: 'g.wanjiku@acme.co.ke', organization: 'Acme Technologies', role: 'Tenant Admin', status: 'active' },
  { id: 'u-002', name: 'David Kamau', email: 'd.kamau@acme.co.ke', organization: 'Acme Technologies', role: 'Staff', status: 'active' },
  { id: 'u-003', name: 'Ruth Nkirote', email: 'r.nkirote@beta.co.ke', organization: 'Beta Solutions Ltd', role: 'Tenant Admin', status: 'active' },
  { id: 'u-004', name: 'Tom Waweru', email: 't.waweru@beta.co.ke', organization: 'Beta Solutions Ltd', role: 'Staff', status: 'active' },
  { id: 'u-005', name: 'Isaac Kimani', email: 'i.kimani@gamma.co.ke', organization: 'Gamma Logistics', role: 'Tenant Admin', status: 'active' },
  { id: 'u-006', name: 'Mercy Rotich', email: 'm.rotich@gamma.co.ke', organization: 'Gamma Logistics', role: 'Staff', status: 'active' },
  { id: 'u-007', name: 'Ann Mwenda', email: 'a.mwenda@epsilon.co.ke', organization: 'Epsilon Enterprises', role: 'Tenant Admin', status: 'inactive' },
  { id: 'u-008', name: 'Brian Oloo', email: 'b.oloo@zeta.co.ke', organization: 'Zeta Capital Partners', role: 'Tenant Admin', status: 'inactive' },
]

const columns: TableColumn<PlatformUser>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email', render: (row) => <span className="font-mono text-xs">{row.email}</span> },
  { key: 'organization', label: 'Organization' },
  {
    key: 'role',
    label: 'Role',
    render: (row) => (
      <Badge variant={row.role === 'Tenant Admin' ? 'amber' : 'neutral'}>{row.role}</Badge>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'green' : 'red'}>{row.status}</Badge>
    ),
  },
]

function Users() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => platformUsers.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    ),
    [search],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Users"
        subtitle="Platform users across all organizations"
      />
      <div className="w-72 mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email…"
        />
      </div>
      <Table<PlatformUser>
        columns={columns}
        rows={filtered}
        emptyMessage="No users match your search."
      />
    </div>
  )
}

export default Users
