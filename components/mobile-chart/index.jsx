import useAreaChart from 'components/chart/use-area-chart'
import useCandleChart from 'components/chart/use-candle-chart'
import { BodyCopySm, BodyCopyTiny } from 'components/type'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { ArrowUp } from 'react-feather'
import useStore, { chartModes } from 'store/use-store'
import theme from 'theme'
import {
  AreaSeriesChart,
  Ask,
  AssetInfo,
  AssetSearchPlaceholder,
  Bid,
  CandleStickChart,
  ChartModeButton,
  ChartWrapper,
  Container,
  CurrentPrice,
  DailyChange,
  InfoPair,
  OHLC,
  Price,
  PriceContainer,
  Spread,
  StatsChartIcon,
  TradingPair,
  TrendingUpIcon,
  Volume
} from './mobile-chart.css'

function MobileChart({
  priceData,
  volumeData,
  data,
  assetName,
  dailyChange,
  algoVolume,
  baseAsset,
  ohlc,
  bid,
  ask,
  spread
}) {
  const MODE_ICON_COLOR = '#f2f2f2'
  const formattedDailyChange =
    dailyChange > 0 ? `+${dailyChange?.toFixed(2)}%` : `-${dailyChange?.toFixed(2)}%` || ''

  const chartMode = useStore((state) => state.chartMode)

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData, data)
  const { areaChart } = useAreaChart(areaChartRef, volumeData, priceData, data)

  const changeMode = () => {
    if (chartMode === chartModes.AREA && candleChart) {
      const logicalRange = areaChart.timeScale().getVisibleLogicalRange()
      useStore.setState({ chartMode: chartModes.CANDLE })
      candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }

    if (chartMode === chartModes.CANDLE) {
      const logicalRange = candleChart.timeScale().getVisibleLogicalRange()
      useStore.setState({ chartMode: chartModes.AREA })
      areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }
  }

  return (
    <Container>
      <AssetSearchPlaceholder>
        <TradingPair>
          <span>{assetName}</span>
          <span>{`/${baseAsset}`}</span>
        </TradingPair>
        <DailyChange isPositive={dailyChange > 0}>
          <BodyCopySm lineHeight={1}>{formattedDailyChange}</BodyCopySm>
        </DailyChange>
        <PriceContainer>
          <ArrowUp color={theme.colors.green[500]} />
          <Price>0.8000</Price>
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
              <BodyCopyTiny color="green.500">{ohlc?.open}</BodyCopyTiny>
            </InfoPair>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                H:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">{ohlc?.high}</BodyCopyTiny>
            </InfoPair>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                L:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">{ohlc?.low}</BodyCopyTiny>
            </InfoPair>
            <InfoPair>
              <BodyCopyTiny color="gray.100" mr={1}>
                C:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500">{ohlc?.close}</BodyCopyTiny>
            </InfoPair>
          </OHLC>
          <CurrentPrice>
            <Ask>{ask}</Ask>
            <Spread>{spread}</Spread>
            <Bid>{bid}</Bid>
          </CurrentPrice>
          <Volume>
            <BodyCopyTiny color="gray.100" mr={1}>
              VOL(ALGO):
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.100">{algoVolume}</BodyCopyTiny>
          </Volume>
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

MobileChart.propTypes = {
  priceData: PropTypes.arrayOf(PropTypes.object),
  volumeData: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  assetName: PropTypes.string,
  dailyChange: PropTypes.number,
  algoVolume: PropTypes.number,
  baseAsset: PropTypes.string,
  ohlc: PropTypes.shape({
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    close: PropTypes.number
  }),
  bid: PropTypes.number,
  ask: PropTypes.number,
  spread: PropTypes.number
}
