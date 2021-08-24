import { getPriceData } from './fetch'

export const chartQueries = {
  getPriceData: {
    key: '[charts]-fetch-price-data',
    fetchFunction: getPriceData,
    options: {
      refetchInterval: 1000,
      retryDelay: 1000
    }
  }
}
