import PropTypes from 'prop-types'
import { Container, Percent, Bar } from './progress-bar.css'

function ProgressBar({ value, max, type }) {
  return (
    <Container>
      <Bar value={value} max={max} orderType={type} />
      <Percent>{((value / max) * 100).toFixed(2)}%</Percent>
    </Container>
  )
}

export default ProgressBar

ProgressBar.propTypes = {}
ProgressBar.defaultProps = {}
