import Commission from 'models/commission'
import http from 'utils/http'

export interface CommissionProps {
  page?: number
  search?: string
  category?: string
}

export const getCommissions = (props?: CommissionProps) => {
  return http
    .get(
      `/commissions?page=${props?.page || ''}&search=${
        props?.search || ''
      }&category=${props?.category || ''}`
    )
    .then(({ data }) => ({
      commissions: data.items,
      total: data.count,
      pages: data.pages,
    }))
}

export const getTotalCommissionOfEmployees = (props: {
  search?: string
  positionId?: string
  branchId?: string
  range: 'week' | 'month' | 'year' | ''
}) => {
  return http
    .get(
      `/commissions/total/employees?search=${props?.search || ''}&positionId=${
        props?.positionId || ''
      }&branchId=${props?.branchId || ''}&range=${props?.range || ''}`
    )
    .then(({ data }) => {
      const commissions: Commission[] = data.items.map(
        (com: any) =>
          ({
            id: com.id,
            employee: {
              id: com.employee_id,
              profile: {
                firstname: com.firstname,
                middlename: com.middlename,
                lastname: com.lastname,
                image_url: com.image_url,
              },
              branch: { name: com.branch_name },
              position: { name: com.position_name },
              commissions: com.commissions,
            },
            amount: com.total,
          } as Commission)
      )
      return {
        total: data.count,
        pages: data.pages,
        commissions,
        range: { from: data.start, to: data.end },
      }
    })
}

export const releaseCommission = (commissions: number[]) => {
  return http
    .post('/commissions/release', { commissions })
    .then(({ data }) => data)
}

export const hasCommission = (paidAmount: number, price: number) => {
  const percentage = (paidAmount * 100) / price
  return percentage <= 20
}
