import PropTypes from 'prop-types'

const Modal = (props) => {
  return (
    <div
      className="h-auto w-10/12 md:w-8/12 max-w-screen-lg bg-gray-600 rounded-sm pt-5"
      {...props}
    >
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.element
}
export default Modal
