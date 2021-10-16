import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ChartOverlay from './overlay'
import ChartSettings from './settings'
import useAreaChart from './use-area-chart'
import useCandleChart from './use-candle-chart'
import useStore from 'store/use-store'

import { AreaSeriesChart, CandleStickChart, Container, SettingsContainer } from './chart.css'

function autoScaleProvider(original, chart, priceData) {
    let visibleRange = chart.timeScale().getVisibleRange();
    if (!visibleRange) {
      return;
    }
    const rangeStart = visibleRange.from;
    const rangeEnd = visibleRange.to;
    let max = 0;
    let min = -1;
    for (let i = 0; i < priceData.length; i++) {
        const priceItem = priceData[i];
        if (priceItem.time < rangeStart) {
          continue;
        }
        max = Math.max(priceItem.close, max);
        max = Math.max(priceItem.open, max);
        max = Math.max(priceItem.high, max);
        if (min == -1) {
          min = priceItem.open;
        }
        min = Math.min(priceItem.close, min);
        min = Math.min(priceItem.low, min);
        min = Math.min(priceItem.open, min);
        if (priceItem.time > rangeEnd) {
          break;
        }
        
    }

    const res = original();
    if (res !== null && min != -1) {
        res.priceRange.maxValue = max;
        res.priceRange.minValue = min;
    }

    return res;
}

function ChartView(props) {
  const { asset, asaVolume, ohlc, bid, ask, spread, volumeData, priceData } = props

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData, autoScaleProvider)
  const { areaChart } = useAreaChart(areaChartRef, priceData, autoScaleProvider)

  const chartMode = useStore((state) => state.chartMode)
  const setChartMode = useStore((state) => state.setChartMode)

  const changeMode = (mode) => {
    setChartMode(mode)

    if (mode === 'candle') {
      const logicalRange = areaChart?.timeScale().getVisibleLogicalRange()
      candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
    } else {
      const logicalRange = candleChart?.timeScale().getVisibleLogicalRange()
      areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
    }
  }

  return (
    <Container>
      <>
        <CandleStickChart
          ref={candleChartRef}
          isVisible={chartMode === 'candle'}
          data-testid="candleStickChart"
        />

        <AreaSeriesChart
          ref={areaChartRef}
          isVisible={chartMode === 'area'}
          data-testid="areaChart"
        />
      </>
      <ChartOverlay
        asset={asset}
        ohlc={ohlc}
        bid={bid}
        ask={ask}
        spread={spread}
        volume={asaVolume}
      />
      <SettingsContainer>
        <ChartSettings chartMode={chartMode} onChartModeClick={(mode) => changeMode(mode)} />
      </SettingsContainer>
    </Container>
  )
}

ChartView.propTypes = {
  candleChartRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.any) })
  ]),
  areaChartRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.any) })
  ]),
  asset: PropTypes.object,
  asaVolume: PropTypes.string,
  ohlc: PropTypes.object,
  bid: PropTypes.string,
  ask: PropTypes.string,
  spread: PropTypes.string,
  volumeData: PropTypes.array,
  priceData: PropTypes.array
}

export default ChartView
