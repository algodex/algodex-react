import PropTypes from 'prop-types'
import { isUndefined } from 'lodash/lang'

function InfoFlyover({ row, components, children, isActive }) {
  const { Root } = components

  const isChildren = isActive && !isUndefined(children)
  const isRow = !isChildren && Object.keys(row).length > 0
  const isEmpty = !isRow && !isChildren

  return (
    <Root>
      {isChildren && children}
      {isRow &&
        Object.keys(row).map((key, idx) => (
          <div color="blue" key={idx}>
            {key}: {row[key]}
          </div>
        ))}
      {isEmpty && <div data-testid="empty-flyover">Nothing Found!</div>}
    </Root>
  )
}

function DefaultRoot({ children }) {
  return <div>{children}</div>
}
DefaultRoot.propTypes = {
  children: PropTypes.any
}

InfoFlyover.propTypes = {
  row: PropTypes.object,
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),
  children: PropTypes.elementType,
  isActive: PropTypes.bool
}
InfoFlyover.defaultProps = {
  isActive: false,
  row: {},
  components: {
    Root: DefaultRoot
  }
}
export default InfoFlyover
