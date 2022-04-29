import { OrderBookPriceInfo as OrderBookPriceInfoView } from './OrderBookPriceInfo'
import React from 'react'
import { render } from 'test/test-utils'

describe('Order Book Price Info', () => {
  const baseAssetData = {
    circulating: 99989322377,
    decimals: 6,
    deleted: false,
    fullName: 'Lamps',
    id: 15322902,
    name: 'LAMP',
    price_info: {
      id: 15322902,
      isTraded: true,
      price: 2120,
      price24Change: -15.166066426570628,
      priceBefore: 2499,
      unix_time: 1644016284
    },
    timestamp: 1618666459,
    total: 100000000000,
    txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
    txns: 614736,
    url: null,
    verified: false
  }
  const algoPrice = 0.674
  it('should show price', () => {
    const { queryByTestId } = render(
      <OrderBookPriceInfoView algoPrice={algoPrice} asset={baseAssetData} />
    )
    expect(queryByTestId('price-info')).not.toBeNull()
  })

  it('should not show price', () => {
    const { queryByTestId } = render(<OrderBookPriceInfoView asset={{}} />)
    expect(queryByTestId('price-info')).toBeNull()
  })
})
