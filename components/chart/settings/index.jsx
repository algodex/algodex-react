import React from 'react'
import PropTypes from 'prop-types'

import { Container, ToggleWrapper, ToggleInput, ToggleBtn } from './chart-settings.css'

function ChartSettings(props) {
  const { chartMode, onChartModeClick, onChartTimeClick, chartTime } = props

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
        <ToggleBtn as="label" size="small" htmlFor={`time-${i}`} >
          {i}
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
        <ToggleBtn as="label" size="small" htmlFor="mode-candle">
          Candle
        </ToggleBtn>
        <ToggleInput
          type="radio"
          id="mode-area"
          value="area"
          checked={chartMode === 'area'}
          onChange={handleModeClick}
        />
        <ToggleBtn as="label" size="small" htmlFor="mode-area">
          Area
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
