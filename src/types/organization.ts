export type Plan = 'starter' | 'pro' | 'enterprise'

export type OrgStatus = 'active' | 'paused'

export type Organization = {
  id: string
  name: string
  slug: string
  plan: Plan
  users: number
  visitors: number
  status: OrgStatus
}
