import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { mdiClose } from '@mdi/js'

const DropdownHeader = ({ closeFn }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <Typography variant="subtitle" color="gray.100">
        Your Wallets
      </Typography>
      <Icon
        onClick={closeFn}
        path={mdiClose}
        title="Close Dropdown"
        size={0.8}
        className="cursor-pointer"
        color="#FFFFFF"
      />
    </div>
  )
}

DropdownHeader.propTypes = {
  closeFn: PropTypes.func
}

export default DropdownHeader
