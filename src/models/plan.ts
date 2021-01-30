export interface Plan {
  plan: 'Plan 1' | 'Plan 2' | 'Plan 3'
  price: number
  monthly: number
  quarterly: number
  semiAnnually: number
  annually: number
  amenities?: string
}

export default Plan
