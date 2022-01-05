import PropTypes from 'prop-types'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  z-index: 200;
  background: rgba(0, 0, 0, 0.7);
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`
const Modal = (props) => {
  return (
    <ModalWrapper
      isVisible={props.isVisible}
      className="absolute w-full h-full justify-center items-center"
      {...props}
    >
      {props.children}
    </ModalWrapper>
  )
}

Modal.propTypes = {
  children: PropTypes.element,
  isVisible: PropTypes.bool
}
export default Modal
