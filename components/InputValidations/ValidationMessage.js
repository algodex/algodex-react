import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import { mdiAlertCircle } from '@mdi/js'

export const ValidationMessage = ({ components, message }) => {
  const { Icon } = components
  return (
    <div className="flex items-center text-xs mb-4 font-medium text-red-700">
      <Icon path={mdiAlertCircle} title="Alert Icon" size={0.7} />
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
