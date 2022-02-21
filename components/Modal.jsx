import MUIModal from '@mui/material/Modal'
import PropTypes from 'prop-types'

const ModalWrapper = (props) => {
  return (
    <MUIModal
      open={props.isVisible}
      hideBackdrop={props.hideBackdrop}
      className="w-full"
      style={{ backgroundColor: `${props.hideBackdrop ? 'rgba(0, 0, 0, 0.7)' : 'none'}` }}
      {...props}
    >
      {props.children}
    </MUIModal>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.element,
  isVisible: PropTypes.bool,
  hideBackdrop: PropTypes.bool
}

ModalWrapper.defaultProps = {
  hideBackdrop: true
}
export default ModalWrapper
