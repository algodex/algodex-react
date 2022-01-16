import React from 'react'
import PropTypes from 'prop-types'
import useStore, { getChartTimeInterval } from 'store/use-store'
import { Container, ToggleWrapper, ToggleInput, ToggleBtn } from './chart-settings.css'
import useTranslation from 'next-translate/useTranslation'

function ChartSettings(props) {
  const { chartMode, onChartModeClick } = props
  const { t } = useTranslation('chart')
  const chartTime = useStore((state) => getChartTimeInterval(state))
  const onChartTimeClick = useStore((state) => state.setChartTimeInterval)

  const handleModeClick = (e) => {
    onChartModeClick(e.target.value)
  }

  const handleTimeClick = (e) => {
    onChartTimeClick(e.target.value)
  }

  const renderTimeIntervals = () => {
    // @todo: should be handled in view and passed as props when supported
    return ['1m', '5m', '15m', '1h', '4h', '1d'].map((i) => (
      <React.Fragment key={i}>
        <ToggleInput
          type="radio"
          id={`time-${i}`}
          value={i}
          checked={i === chartTime}
          onChange={handleTimeClick}
        />
        <ToggleBtn size="small">
          <label htmlFor={`time-${i}`}>{i}</label>
        </ToggleBtn>
      </React.Fragment>
    ))
  }

  return (
    <Container>
      <ToggleWrapper>
        <ToggleInput
          type="radio"
          id="mode-candle"
          value="candle"
          checked={chartMode === 'candle'}
          onChange={handleModeClick}
        />
        <ToggleBtn size="small">
          <label htmlFor="mode-candle">{t('candle')}</label>
        </ToggleBtn>
        <ToggleInput
          type="radio"
          id="mode-area"
          value="area"
          checked={chartMode === 'area'}
          onChange={handleModeClick}
        />
        <ToggleBtn size="small">
          <label htmlFor="mode-area">{t('area')}</label>
        </ToggleBtn>
      </ToggleWrapper>
      <ToggleWrapper>{renderTimeIntervals()}</ToggleWrapper>
    </Container>
  )
}

ChartSettings.propTypes = {
  chartMode: PropTypes.string,
  chartTime: PropTypes.string,
  onChartModeClick: PropTypes.func,
  onChartTimeClick: PropTypes.func
}

export default ChartSettings
