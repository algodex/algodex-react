import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Custom coponent
import { CopyIcon } from './copyIcon'
import { truncatedWalletAddress } from 'components/helpers'
import { styles } from './styles.css'

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
      {isConnected && (
        <Button
          type="button"
          sx={{
            color: 'white',
            backgroundColor: 'gray.150',
            px: '10px',
            py: '1px',
            fontWeight: 500,
            fontSize:'12px',
            border: '2px solid',
            transition: 'all ease .3s',
            '&:hover': {
              color: 'white'
            }
          }}
        >
          DISCONNECT
        </Button>
      )}
    </>
  )
}
