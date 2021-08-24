import {
  getPriceData,
  getRecentTrades,
  getOrdersInEscrow,
  getOpenOrdersByAddress,
  getTradeHistory
} from './fetch'

export const chartQueries = {
  getPriceData: {
    key: '[charts]-get-price-data',
    fetchFunction: getPriceData,
    options: {
      refetchInterval: 1000,
      retryDelay: 1000
    }
  }
}

export const recentTradesQueries = {
  getRecentTrades: {
    key: '[recent-trades]-get-recent-trades',
    fetchFunction: getRecentTrades,
    options: {
      refetchInterval: 1000,
      retryDelay: 1000
    }
  }
}

export const ordersQueries = {
  getOrdersInEscrow: {
    key: '[orders]-get-orders-in-escrow',
    fetchFunction: getOrdersInEscrow,
    options: {
      refetchInterval: 5000,
      retryDelay: 5000
    }
  },
  getOpenOrdersByAddress: {
    key: '[orders]-get-open-orders-by-address',
    fetchFunction: getOpenOrdersByAddress,
    options: {
      refetchInterval: 3000,
      retryDelay: 3000
    }
  }
}

export const tradeHistoryQueries = {
  getTradeHistory: {
    key: '[trade-history]-get-trade-history',
    fetchFunction: getTradeHistory,
    options: {
      refetchInterval: 3000,
      retryDelay: 5000
    }
  }
}
