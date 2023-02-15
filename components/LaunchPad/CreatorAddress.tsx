import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Custom coponent
import { CopyIcon } from './copyIcon'
import { truncatedWalletAddress } from 'components/helpers'

type creatorAddressTypes = {
  address?: string
}

export const CreatorAddress = ({ address }: creatorAddressTypes) => {
  const isConnected = typeof address !== 'undefined'
  return (
    <>
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
        {isConnected ? (
          <>
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
          </>
        ) : (
          <Typography
            sx={{
              display: 'block',
              paddingBlock: '0',
              fontSize: '15px',
              fontWeight: 500
            }}
          >
            Connect creator wallet above
          </Typography>
        )}
      </Box>
    </>
  )
}
