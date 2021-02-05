import Payment from 'models/payment'

const payments: Payment[] = [
  { id: 1, client: 1, amount: 388, or_number: '1033-233444' },
  { id: 2, client: 1, amount: 388, or_number: '1033-233445' },
  { id: 3, client: 2, amount: 568, or_number: '1033-233455' },
]

export const getPayments = () => {
  return new Promise<Payment[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(payments)
    }, 3000)
  })
}
