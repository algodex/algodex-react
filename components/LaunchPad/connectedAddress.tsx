import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Custom coponent
import { CopyIcon } from './copyIcon'

export const ConnectedAddress = () => {
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
        V537CZ....4WVQCA
      </Typography>
      <CopyIcon content={'V537CZGHERY87634WVQCA'} />
    </Box>
  )
}
