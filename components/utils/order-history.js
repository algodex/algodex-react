import dayjs from 'dayjs'

export const orderHistoryData = [
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.458,
    pair: ['YLDY', 'ALGO'],
    type: 'BUY',
    role: 'TAKER',
    amount: 1000,
    filled: 125,
    total: 458
  },
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.501,
    pair: ['MCAU', 'ALGO'],
    type: 'SELL',
    role: 'MAKER',
    amount: 9000,
    filled: 3000,
    total: 4600
  }
]
