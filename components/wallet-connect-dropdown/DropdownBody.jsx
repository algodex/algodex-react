import PropTypes from 'prop-types'

const DropdownBody = () => {
  const renderWalletOptionList = () => {
    return <div></div>
  }

  const renderActiveWalletList = () => {
    return <div></div>
  }

  return (
    <div>
      {renderWalletOptionList()}
      {renderActiveWalletList()}
    </div>
  )
}

export default DropdownBody
