import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import { mdiAlertCircle } from '@mdi/js'
import theme from 'theme'

export const ValidationMessage = ({ components, message, ...props }) => {
  const { Icon } = components
  return (
    <div className="flex items-center text-sm mb-4 font-medium text-gray-500">
      <Icon path={mdiAlertCircle} title="Alert Icon" size={0.7} color={theme.palette.gray['500']} />
      <p className="ml-1">{message}</p>
    </div>
  )
}

ValidationMessage.propTypes = {
  components: PropTypes.shape({
    Icon: PropTypes.node
  }),
  message: PropTypes.string
}

ValidationMessage.defaultProps = {
  components: {
    Icon: Icon
  },
  message: ''
}
