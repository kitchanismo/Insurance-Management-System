import http from 'utils/http'

interface CommissionProps {
  page?: number
  search?: string
  category?: string
}

export const getCommissions = (props?: CommissionProps) => {
  return http
    .get(
      `/commissions?page=${props?.page || ''}&search=${
        props?.search || ''
      }&category=${props?.category || ''}`,
    )
    .then(({ data }) => ({
      commissions: data.items,
      total: data.count,
      pages: data.pages,
    }))
}
