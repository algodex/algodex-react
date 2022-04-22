import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const DropdownFooter = () => {
  return (
    <div className="p-4">
      <Typography variant="body2RegularBold" color="gray.000">
        New to Algorand
      </Typography>
      <br />
      <Typography variant="body2BoldUnderline" color="gray.000" className="mt-1">
        Learn More About Algorand Wallets
      </Typography>
    </div>
  )
}

DropdownFooter.propTypes = {
  externalLink: PropTypes.string
}

export default DropdownFooter
