import React from 'react'
import { render } from '../../test/test-utils'
import {
  DEMO_CHART_DATA,
  DEMO_VOLUME_DATA,
  DEMO_BID_ASK_PRICE,
  DEMO_SELECTED_PAIR,
  DEMO_VOLUME_AMOUNT,
  DEMO_DAILY_CHANGE_PERCENT,
  DEMO_OHLC
} from './demo'
import Chart from '.'

const DEMO_SPREAD_AMOUNT = parseFloat(
  Math.abs(DEMO_BID_ASK_PRICE.ask - DEMO_BID_ASK_PRICE.bid).toFixed(4)
)

const DEMO_DATA = {
  bidAndAsk: DEMO_BID_ASK_PRICE,
  priceData: DEMO_CHART_DATA,
  volume24hr: DEMO_VOLUME_AMOUNT,
  pair: DEMO_SELECTED_PAIR,
  dailyChange: DEMO_DAILY_CHANGE_PERCENT,
  ohlc: DEMO_OHLC,
  volumeData: DEMO_VOLUME_DATA,
  initialMode: 'CANDLE'
}

const DEFAULT_DATA = {
  bidAndAsk: {
    bid: 0,
    ask: 0
  },
  priceData: [],
  volume24hr: 0,
  pair: ['ALGO', 'ALGO'],
  dailyChange: 0,
  ohlc: {
    open: 0,
    high: 0,
    low: 0,
    close: 0
  },
  volumeData: [],
  initialMode: 'CANDLE'
}

describe('Chart', () => {
  describe('if no price data is passed', () => {
    it('should display the trading pair as ALGO/ALGO', () => {
      const { getByTestId } = render(<Chart {...DEFAULT_DATA} />)

      expect(getByTestId('primaryAsset')).toHaveTextContent('ALGO')
      expect(getByTestId('secondaryAsset')).toHaveTextContent('/ALGO')
    })

    it('should display 0 for all numeric values', () => {
      const { getByTestId } = render(<Chart {...DEFAULT_DATA} />)

      expect(parseFloat(getByTestId('dailyChange').textContent.replace(/-(?=\d)/, ''))).toEqual(0)
      expect(parseFloat(getByTestId('ask').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('bid').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('spread').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('open24hr').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('high24hr').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('low24hr').textContent)).toBeCloseTo(0)
      expect(parseFloat(getByTestId('close24hr').textContent)).toBeCloseTo(0)
    })

    it('should show the candlestick chart by default', () => {
      const { getByTestId } = render(<Chart {...DEFAULT_DATA} />)

      expect(getByTestId('candleStickChart')).toBeVisible()
      expect(getByTestId('lineChart')).not.toBeVisible()
    })
  })

  describe('if price data is passed', () => {
    it('should display the trading pair as YLDY/ALGO', () => {
      const { getByTestId } = render(<Chart {...DEMO_DATA} />)

      expect(getByTestId('primaryAsset')).toHaveTextContent('YLDY')
      expect(getByTestId('secondaryAsset')).toHaveTextContent('/ALGO')
    })

    it('should display demo values for price information', () => {
      const { getByTestId } = render(<Chart {...DEMO_DATA} />)

      // expect(getByTestId('dailyChange').textContent).toBeCloseTo(0)
      expect(parseFloat(getByTestId('ask').textContent)).toBeCloseTo(
        parseFloat(DEMO_BID_ASK_PRICE.ask)
      )
      expect(parseFloat(getByTestId('bid').textContent)).toBeCloseTo(
        parseFloat(DEMO_BID_ASK_PRICE.bid)
      )
      expect(parseFloat(getByTestId('spread').textContent)).toBeCloseTo(
        parseFloat(DEMO_SPREAD_AMOUNT)
      )
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
      expect(getByTestId('lineChart')).not.toBeVisible()
    })
  })
})
