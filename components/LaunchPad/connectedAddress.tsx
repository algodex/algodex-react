import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Custom coponent
import { CopyIcon } from './copyIcon'

export const ConnectedAddress = () => {
  const connected = false //this is a fake data, not tied to anything. Just for UI purposes.

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: 'solid',
        borderColor: 'white',
        color: 'white',
        columnGap: '5px',
        borderRadius: '3px',
        padding: '5px 7px'
      }}
    >
      {connected ? (
        <>
          <Typography
            sx={{
              display: 'block',
              paddingBlock: '0',
              fontSize: '15px',
              fontWeight: 500
            }}
          >
            V537CZ....4WVQCA
          </Typography>
          <CopyIcon content={'V537CZGHERY87634WVQCA'} />
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
  )
}
