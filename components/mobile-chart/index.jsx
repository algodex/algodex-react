import PropTypes from 'prop-types'
import { BodyCopySm, BodyCopyTiny } from 'components/type'
import theme from 'theme'
import {
  Container,
  ChartWrapper,
  AssetSearchPlaceholder,
  TradingPair,
  DailyChange,
  PriceContainer,
  Price,
  AssetInfo,
  OHLC,
  ChartModeButton,
  InfoPair,
  StatsChartIcon,
  TrendingUpIcon,
  CandleStickChart,
  AreaSeriesChart
} from './mobile-chart.css'
import { useRef } from 'react'
import { ArrowUp, ArrowDown } from 'react-feather'
import useStore, { chartModes } from 'store/use-store'
import useAreaChart from 'components/chart/use-area-chart'
import useCandleChart from 'components/chart/use-candle-chart'

function MobileChart({ priceData, volumeData, data }) {
  const MODE_ICON_COLOR = '#f2f2f2'

  const chartMode = useStore((state) => state.chartMode)

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData, data)
  const { areaChart } = useAreaChart(areaChartRef, volumeData, priceData, data)

  const changeMode = () => {
    if (chartMode === chartModes.AREA) {
      useStore.setState({ chartMode: chartModes.CANDLE })
      const logicalRange = areaChart.timeScale().getVisibleLogicalRange()
      candleChart.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }

    if (chartMode === chartModes.CANDLE) {
      useStore.setState({ chartMode: chartModes.AREA })
      const logicalRange = candleChart.timeScale().getVisibleLogicalRange()
      areaChart.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }
  }

  return (
    <Container>
      <AssetSearchPlaceholder>
        <TradingPair>
          <span>YLDY</span>
          <span>/ALGO</span>
        </TradingPair>
        <DailyChange>
          <BodyCopySm lineHeight={1}>-5.26%</BodyCopySm>
        </DailyChange>
        <PriceContainer>
          <ArrowUp color={theme.colors.green[500]} />
          <Price>1.3645</Price>
        </PriceContainer>
      </AssetSearchPlaceholder>
      <ChartWrapper>
        <>
          <CandleStickChart
            ref={candleChartRef}
            isVisible={chartMode === chartModes.CANDLE ? true : false}
          />
          <AreaSeriesChart
            ref={areaChartRef}
            isVisible={chartMode === chartModes.AREA ? true : false}
          />
        </>
        <AssetInfo>
          <OHLC>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                O:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">1.3257</BodyCopyTiny>
            </InfoPair>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                H:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">1.3257</BodyCopyTiny>
            </InfoPair>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                L:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">1.3257</BodyCopyTiny>
            </InfoPair>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                C:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">1.3257</BodyCopyTiny>
            </InfoPair>
          </OHLC>
          <ChartModeButton onClick={() => changeMode(chartMode)}>
            {chartMode === chartModes.CANDLE ? (
              <TrendingUpIcon color={MODE_ICON_COLOR} width="1rem" height="1rem" />
            ) : (
              <StatsChartIcon color={MODE_ICON_COLOR} width="1rem" height="1rem" />
            )}
          </ChartModeButton>
        </AssetInfo>
      </ChartWrapper>
    </Container>
  )
}

export default MobileChart

MobileChart.propTypes = {}
MobileChart.defaultProps = {}
