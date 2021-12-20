import PropTypes from 'prop-types'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  z-index: 200;
  background: rgba(0, 0, 0, 0.7);
  visibility: ${({ visibility }) => (visibility ? 'visible' : 'hidden')};
`
const Modal = (props) => {
  return (
    <ModalWrapper
      visibility={props.visibility}
      className="absolute w-full h-full flex justify-center items-center"
      {...props}
    >
      {props.children}
    </ModalWrapper>
    // <div
    //   className="h-auto w-10/12 md:w-8/12 max-w-screen-lg bg-gray-600 rounded-sm pt-5"
    //   {...props}
    // >
    //   {props.children}
    // </div>
  )
}

Modal.propTypes = {
  children: PropTypes.element,
  visibility: PropTypes.bool
}
export default Modal
