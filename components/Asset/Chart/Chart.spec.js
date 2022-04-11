import React from 'react'
import { render } from 'test/test-utils'
import { Chart } from './Chart'
import {
  DEMO_VOLUME_DATA,
  DEMO_OHLC,
  DEMO_BID,
  DEMO_ASK,
  DEMO_SPREAD,
  DEMO_ALGO_VOLUME,
  DEMO_PRICE_DATA
} from '@/spec/Chart'

const DEMO_DATA = {
  interval: '1h',
  asset: { id: 15322902, decimals: 6, name: 'LAMP' },
  mode: 'candle',
  overlay: {
    orderbook: {
      bid: DEMO_BID,
      ask: DEMO_ASK,
      spread: DEMO_SPREAD
    },
    ohlc: DEMO_OHLC,
    volume: DEMO_ALGO_VOLUME
  },
  ohlc: DEMO_PRICE_DATA,
  volume: DEMO_VOLUME_DATA
}

const DEFAULT_DATA = {
  asset: { id: 15322902, decimals: 6, name: 'LAMP' },
  interval: '1h',
  overlay: {
    orderbook: {
      bid: 0,
      ask: 0,
      spread: 0
    },
    ohlc: {
      open: 0,
      high: 0,
      low: 0,
      close: 0
    },
    volume: 0
  },
  ohlc: [],
  volume: [],
  mode: 'candle'
}

describe.skip('Chart', () => {
  describe('if no price data is passed', () => {
    it('should display the trading pair as LAMP/ALGO', (done) => {
      const { getByTestId } = render(<Chart {...DEFAULT_DATA} />)

      expect(getByTestId('trading-pair')).toHaveTextContent('LAMP / ALGO')
      done()
    })

    it('should display 0 for all numeric values', (done) => {
      const { getByTestId } = render(<Chart {...DEFAULT_DATA} />)

      expect(parseFloat(getByTestId('dailyChange').textContent.replace(/-(?=\d)/, ''))).toEqual(0)
      expect(parseFloat(getByTestId('ask').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('bid').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('spread').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('open24hr').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('high24hr').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('low24hr').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('close24hr').textContent)).toBeCloseTo(0)
      done()
    })

    it('should show the candlestick chart by default', () => {
      const { getByTestId } = render(<Chart {...DEFAULT_DATA} />)

      expect(getByTestId('candleStickChart')).toBeVisible()
      expect(getByTestId('areaChart')).not.toBeVisible()
    })
  })

  describe('if price data is passed', () => {
    it('should display the trading pair as LAMP/ALGO', () => {
      const { getByTestId } = render(<Chart {...DEMO_DATA} />)

      expect(getByTestId('trading-pair')).toHaveTextContent('LAMP / ALGO')
    })

    it('should display demo values for price information', () => {
      const { getByTestId } = render(<Chart {...DEMO_DATA} />)

      // expect(getByTestId('dailyChange').textContent).toBeCloseTo(0)
      expect(parseFloat(getByTestId('ask').textContent)).toBeCloseTo(parseFloat(DEMO_ASK))
      expect(parseFloat(getByTestId('bid').textContent)).toBeCloseTo(parseFloat(DEMO_BID))
      expect(parseFloat(getByTestId('spread').textContent)).toBeCloseTo(parseFloat(DEMO_SPREAD))
      expect(parseFloat(getByTestId('open24hr').textContent)).toBeCloseTo(
        parseFloat(DEMO_OHLC.open.toFixed(4))
      )
      expect(parseFloat(getByTestId('high24hr').textContent)).toBeCloseTo(
        parseFloat(DEMO_OHLC.high.toFixed(4))
      )
      expect(parseFloat(getByTestId('low24hr').textContent)).toBeCloseTo(
        parseFloat(DEMO_OHLC.low.toFixed(4))
      )
      expect(parseFloat(getByTestId('close24hr').textContent)).toBeCloseTo(
        parseFloat(DEMO_OHLC.close.toFixed(4))
      )
    })

    it('should show the candlestick chart by default', () => {
      const { getByTestId } = render(<Chart {...DEMO_DATA} />)

      expect(getByTestId('candleStickChart')).toBeVisible()
      expect(getByTestId('areaChart')).not.toBeVisible()
    })
  })
})
