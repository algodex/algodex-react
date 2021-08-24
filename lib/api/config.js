import { getPriceData, getRecentTrades } from './fetch'

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
