import PropTypes from 'prop-types'
import { Container, Percent, Bar } from './progress-bar.css'

function ProgressBar({ value, max, type }) {
  return (
    <Container>
      <Bar value={value} max={max} orderType={type} data-testid="progress-bar" />
      <Percent data-testid="percent-text">{((value / max) * 100).toFixed(2)}%</Percent>
    </Container>
  )
}

export default ProgressBar

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  type: PropTypes.string
}
