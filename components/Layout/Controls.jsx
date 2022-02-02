import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Section } from '@/components/Layout/Section'

const Grid = styled.main`
  position: relative;
  display: grid;
  grid-template-columns: none;
  grid-auto-columns: auto;

  overflow: hidden;

  height: 100%;
  width: 100%;

  grid-template-columns: auto;
  grid-template-areas:
    'topLeft topRight'
    'bottomLeft bottomRight';
`
export function Controls({ children, ...rest }) {
  return (
    <Section {...rest}>
      <Grid {...rest}>{children}</Grid>
    </Section>
  )
}

Controls.propTypes = {
  area: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

Controls.defaultProps = {
  area: 'controls',
  active: 'true'
}

export default Controls
