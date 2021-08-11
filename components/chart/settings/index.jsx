import PropTypes from 'prop-types'

import { Container, ToggleWrapper, ToggleInput, ToggleBtn } from './chart-settings.css'

function ChartSettings(props) {
  const { chartMode, onChartModeClick } = props

  const handleModeClick = (e) => {
    onChartModeClick(e.target.value)
  }

  const renderTimeIntervals = () => {
    // @todo: should be handled in view and passed as props when supported
    return ['1m', '5m', '15m', '1h', '4h', '1d'].map((i) => (
      <>
        <ToggleInput
          type="radio"
          id={`time-${i}`}
          value={i}
          checked={i === '1d'}
          onChange={() => null}
          disabled={i !== '1d'}
        />
        <ToggleBtn as="label" size="small" htmlFor={`time-${i}`}>
          {i}
        </ToggleBtn>
      </>
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
  onChartModeClick: PropTypes.func
}

export default ChartSettings
