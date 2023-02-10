import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

// Custom coponent
import { CopyIcon } from './copyIcon'
import { truncatedWalletAddress } from 'components/helpers'

export const ConnectedAddress = ({ address }) => {
  const isConnected = typeof address !== 'undefined'
  return (
    <>
      {isConnected ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: 'solid',
            borderColor: 'white',
            color: 'white',
            columnGap: '5px',
            borderRadius: '3px',
            padding: '5px'
          }}
        >
          <Typography
            sx={{
              display: 'block',
              paddingBlock: '0',
              fontSize: '15px',
              fontWeight: 500
            }}
          >
            {truncatedWalletAddress(address, 4)}
          </Typography>
          <CopyIcon content={address} />
        </Box>
      ) : (
        <Typography
          sx={{
            display: 'block',
            paddingBlock: '0',
            fontSize: '15px',
            fontWeight: 500,
            color: 'white'
          }}
        >
          {/* Needs to be styled properly */}
          Please connect the wallet you wish to create the asset
        </Typography>
      )}
    </>
  )
}

ConnectedAddress.propTypes = {
  address: PropTypes.string
}
