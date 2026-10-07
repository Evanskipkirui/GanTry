import { useMemo } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import Table, { type TableColumn } from '@/components/ui/Table'
import { appointments } from '@/data/appointments'
import type { Appointment } from '@/types/appointment'
import { formatDateTime } from '@/lib/format'
import { useTenant } from '@/context/TenantContext'

const columns: TableColumn<Appointment>[] = [
  { key: 'visitorName', label: 'Visitor' },
  { key: 'host', label: 'Host' },
  { key: 'purpose', label: 'Purpose' },
  {
    key: 'scheduledAt',
    label: 'Scheduled At',
    render: (row) => (
      <span className="font-mono text-xs">{formatDateTime(row.scheduledAt)}</span>
    ),
  },
]

function Appointments() {
  const { currentTenant } = useTenant()

  const tenantAppointments = useMemo(
    () => appointments.filter((a) => a.tenantId === currentTenant.slug),
    [currentTenant.slug],
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Appointments"
        subtitle="Scheduled visitor appointments"
      />
      <Table<Appointment>
        columns={columns}
        rows={tenantAppointments}
        emptyMessage="No appointments scheduled."
      />
    </div>
  )
}

export default Appointments
