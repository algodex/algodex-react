import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import { mdiClose } from '@mdi/js'

const DropdownHeader = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <p
        style={{
          fontSize: '16px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        Your Wallets
      </p>
      <Icon
        path={mdiClose}
        title="Close Dropdown"
        size={0.8}
        className="cursor-pointer"
        color="#FFFFFF"
      />
    </div>
  )
}

export default DropdownHeader
