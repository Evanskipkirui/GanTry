import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Table, { type TableColumn } from '@/components/ui/Table'
import Select from '@/components/ui/Select'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import Modal from '@/components/ui/Modal'
import type { Visitor, VisitorStatus } from '@/types/visitor'
import { formatTime } from '@/lib/format'
import { useTenant } from '@/context/TenantContext'
import useVisitors from '@/hooks/useVisitors'
import usePagination from '@/hooks/usePagination'

const PAGE_SIZE = 10

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

function Visitors() {
  const navigate = useNavigate()
  const { currentTenant } = useTenant()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<VisitorStatus | 'all'>('all')
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  // useCallback: stable references when passed to child components (columns render, Modal handlers)
  const handleDeleteClick = useCallback((id: string) => {
    setConfirmingId(id)
  }, [])

  const handleConfirmDelete = useCallback(() => {
    setConfirmingId(null)
  }, [])

  const handleCancelDelete = useCallback(() => {
    setConfirmingId(null)
  }, [])

  // Columns defined inside component so handleDeleteClick is in closure scope
  const columns: TableColumn<Visitor>[] = useMemo(() => [
    { key: 'name', label: 'Visitor' },
    { key: 'host', label: 'Host' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'status', label: 'Status', render: (row) => statusBadge(row.status) },
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
      key: 'id',
      label: 'Action',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteClick(row.id)}
        >
          Delete
        </Button>
      ),
    },
  ], [handleDeleteClick])

  const tenantVisitors = useVisitors({ tenantSlug: currentTenant.slug })

  const filtered = useMemo(() => {
    return tenantVisitors.filter((v) => {
      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [tenantVisitors, search, statusFilter])

  const { page, totalPages, canPrev, canNext, nextPage, prevPage, paginate, reset } = usePagination({
    totalItems: filtered.length,
    pageSize: PAGE_SIZE,
  })

  const paginated = paginate(filtered)

  const confirmingVisitor = confirmingId
    ? tenantVisitors.find((v) => v.id === confirmingId)
    : null

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Visitors"
        subtitle={`Visitor records for ${currentTenant.name}`}
        actions={
          <Button variant="featured" onClick={() => navigate('/tenant/register')}>
            Register Visitor
          </Button>
        }
      />

      <div className="flex gap-4 mb-5">
        <div className="w-64">
          <SearchInput
            value={search}
            onChange={(value) => { setSearch(value); reset() }}
            placeholder="Search by name…"
          />
        </div>
        <div className="w-48">
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as VisitorStatus | 'all'); reset() }}
          >
            <option value="all">All</option>
            <option value="expected">Expected</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
          </Select>
        </div>
      </div>

      <Table<Visitor>
        columns={columns}
        rows={paginated}
        emptyMessage="No visitors match the current filters."
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        canPrev={canPrev}
        canNext={canNext}
      />

      <Modal
        open={confirmingId !== null}
        onClose={handleCancelDelete}
        title="Remove visitor?"
        actions={
          <>
            <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmDelete}>Confirm</Button>
          </>
        }
      >
        {confirmingVisitor
          ? `This will remove ${confirmingVisitor.name} from the visitor list. This action is for demonstration only.`
          : 'Confirm removal of this visitor.'}
      </Modal>
    </div>
  )
}

export default Visitors
