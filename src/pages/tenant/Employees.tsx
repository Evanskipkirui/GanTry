import { useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Table, { type TableColumn } from '@/components/ui/Table'
import { employees } from '@/data/employees'
import type { Employee } from '@/types/employee'
import { useTenant } from '@/context/TenantContext'

const columns: TableColumn<Employee>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
]

function Employees() {
  const { currentTenant } = useTenant()

  const tenantEmployees = useMemo(
    () => employees.filter((e) => e.tenantId === currentTenant.slug),
    [currentTenant.slug],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Employees"
        subtitle={`Hosts and staff at ${currentTenant.name}`}
      />
      <Table<Employee>
        columns={columns}
        rows={tenantEmployees}
        emptyMessage="No employees found."
      />
    </div>
  )
}

export default Employees
