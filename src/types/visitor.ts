export type VisitorStatus =
  | 'expected'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled'

export type Visitor = {
  id: string
  name: string
  phone: string
  email: string
  host: string
  purpose: string
  status: VisitorStatus
  checkInTime?: string
  checkOutTime?: string
  expectedTime: string
  tenantId: string
}
