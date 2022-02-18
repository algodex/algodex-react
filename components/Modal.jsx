import MUIModal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const ModalContainer = styled(MUIModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 50%;
`

const ModalWrapper = (props) => {
  return (
    <ModalContainer open={props.isVisible} hideBackdrop={props.hideBackdrop} {...props}>
      {props.children}
    </ModalContainer>
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
