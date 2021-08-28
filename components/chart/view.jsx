import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ChartOverlay from './overlay'
import ChartSettings from './settings'
import useAreaChart from './use-area-chart'
import useCandleChart from './use-candle-chart'

import { AreaSeriesChart, CandleStickChart, Container, SettingsContainer } from './chart.css'

function ChartView(props) {
  const { asset, asaVolume, ohlc, bid, ask, spread, volumeData, priceData, onViewChartTimeClick } = props

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData)
  const { areaChart } = useAreaChart(areaChartRef, priceData)

  const [chartMode, setChartMode] = useState('candle')
  const [chartTime, setChartTime] = useState('1d')

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

  const changeTime = (time) => {
    setChartTime(time);
    onViewChartTimeClick(time)

    console.log(time);
    /*alert(time);*/
    /*setChartMode(mode)

    if (mode === 'candle') {
      const logicalRange = areaChart?.timeScale().getVisibleLogicalRange()
      candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
    } else {
      const logicalRange = candleChart?.timeScale().getVisibleLogicalRange()
      areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
    }*/
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
        <ChartSettings chartMode={chartMode} chartTime={chartTime} 
            onChartModeClick={(mode) => changeMode(mode)} 
            onChartTimeClick={(time) => changeTime(time)} 
        />
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
