import Payment from 'models/payment'
import Client from 'models/client'
import Commissioner from 'models/commissioner'

type Transaction = Commissioner & Payment & Client

export default Transaction
