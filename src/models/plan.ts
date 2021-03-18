export interface Plan {
  id: number
  name:
    | 'Plan 1'
    | 'Plan 2'
    | 'Plan 3'
    | 'Plan 4'
    | 'Plan 5'
    | 'Plan 6'
    | 'Plan 7'
    | 'Plan 8'
  regular_price: number
  sr_pwd_price: number
  amenities?: string
}

export default Plan
