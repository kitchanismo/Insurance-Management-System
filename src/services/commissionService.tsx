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

export const getTotalCommissionOfEmployees = (props: CommissionProps) => {
  return http
    .get(
      `/commissions/total/employees?page=${props?.page || ''}&search=${
        props?.search || ''
      }&category=${props?.category || ''}`
    )
    .then(({ data }) => {
      const commissions: Commission[] = data.items.map((com: any) => ({
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
        },
        amount: com.total,
      }))
      return { total: data.count, pages: data.pages, commissions }
    })
}

export const releaseCommission = (employeeId: number) => {
  return http
    .post('/commissions/release', { employeeId })
    .then(({ data }) => data)
}
