import PropTypes from 'prop-types'
import { Typography, Box } from '@mui/material'

const DropdownFooter = () => {
  return (
    <Box className="p-4">
      <Typography variant="body_small_bold" color="gray.000">
        New to Algorand
      </Typography>
      <br />
      <Typography variant="body_small_bold" color="gray.000" className="underline mt-1">
        Learn More About Algorand Wallets
      </Typography>
    </Box>
  )
}

DropdownFooter.propTypes = {
  externalLink: PropTypes.string
}

export default DropdownFooter
