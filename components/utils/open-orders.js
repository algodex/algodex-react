import dayjs from 'dayjs'
import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderType,
  OrderRole,
  OrderAmount,
  OrderFilled,
  OrderTotal
} from 'components/open-orders/open-orders.css'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderTypeCell = ({ value }) => <OrderType value={value}>{value}</OrderType>

const OrderRoleCell = ({ value }) => <OrderRole value={value}>{value}</OrderRole>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

const OrderFilledCell = ({ value }) => <OrderFilled>{value}</OrderFilled>

const OrderTotalCell = ({ value }) => <OrderTotal>{value}</OrderTotal>

export const openOrdersColumns = [
  {
    Header: 'Date',
    accessor: 'date',
    Cell: OrderDateCell
  },
  {
    Header: 'Pair',
    accessor: 'pair',
    Cell: OrderPairCell
  },
  {
    Header: 'Price (ALGO)',
    accessor: 'price',
    Cell: OrderPriceCell
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: OrderTypeCell
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: OrderAmountCell
  },
  {
    Header: 'Filled',
    accessor: 'filled',
    Cell: OrderFilledCell
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: OrderTotalCell
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: OrderRoleCell
  }
]

export const mobileOpenOrdersColumns = [
  {
    Header: 'Pair',
    accessor: 'pair',
    Cell: OrderPairCell
  },
  {
    Header: 'Price (ALGO)',
    accessor: 'price',
    Cell: OrderPriceCell
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: OrderTypeCell
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    Cell: OrderAmountCell
  },
  {
    Header: 'Filled',
    accessor: 'filled',
    Cell: OrderFilledCell
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: OrderTotalCell
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: OrderRoleCell
  }
]

export const openOrdersData = [
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.458,
    pair: ['YLDY', 'ALGO'],
    type: 'BUY',
    role: 'MAKER',
    amount: 1000,
    filled: 125,
    total: 458
  },
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.501,
    pair: ['MCAU', 'ALGO'],
    type: 'SELL',
    role: 'TAKER',
    amount: 9000,
    filled: 3000,
    total: 4600
  },
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.256,
    pair: ['FAME', 'ALGO'],
    type: 'BUY',
    role: 'MAKER',
    amount: 900,
    filled: 440,
    total: 458
  },
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.501,
    pair: ['PUP', 'ALGO'],
    type: 'BUY',
    role: 'MAKER',
    amount: 852,
    filled: 225,
    total: 3265
  },
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 0.458,
    pair: ['AGE', 'ALGO'],
    type: 'SELL',
    role: 'TAKER',
    amount: 265,
    filled: 22,
    total: 451
  },
  {
    date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
    price: 1.421,
    pair: ['JEST', 'ALGO'],
    type: 'BUY',
    role: 'TAKER',
    amount: 45,
    filled: 6,
    total: 4600
  }
]
