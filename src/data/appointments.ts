import type { Appointment } from '@/types/appointment'

export const appointments: Appointment[] = [
  {
    id: 'apt-001',
    visitorName: 'Kevin Mutua',
    host: 'David Kamau',
    purpose: 'Meeting',
    scheduledAt: '2026-10-05T13:30:00',
    tenantId: 'acme',
  },
  {
    id: 'apt-002',
    visitorName: 'Fatuma Hassan',
    host: 'Sylvia Ndung\'u',
    purpose: 'Interview',
    scheduledAt: '2026-10-05T09:00:00',
    tenantId: 'acme',
  },
  {
    id: 'apt-003',
    visitorName: 'Aisha Mwangi',
    host: 'Peter Odhiambo',
    purpose: 'Vendor',
    scheduledAt: '2026-10-05T11:00:00',
    tenantId: 'acme',
  },
  {
    id: 'apt-004',
    visitorName: 'Dennis Omondi',
    host: 'Grace Wanjiku',
    purpose: 'Vendor',
    scheduledAt: '2026-10-05T14:00:00',
    tenantId: 'acme',
  },
  {
    id: 'apt-005',
    visitorName: 'Ronald Barasa',
    host: 'Felix Kiplagat',
    purpose: 'Maintenance',
    scheduledAt: '2026-10-06T08:00:00',
    tenantId: 'acme',
  },
  {
    id: 'apt-006',
    visitorName: 'Stella Moraa',
    host: 'Janet Muriithi',
    purpose: 'Meeting',
    scheduledAt: '2026-10-06T10:30:00',
    tenantId: 'acme',
  },
]
