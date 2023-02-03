import React, { useState } from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Tooltip from '@mui/material/Tooltip'
import { styles } from './styles.css'

export const ConnectedAddress = () => {
  const [tooltiptext, setTooltiptext] = useState('Click to Copy')

  const copyAddress = (address) => {
    document.querySelector('.copyToClipboard')
    navigator.clipboard.writeText(address)
    setTooltiptext(`Copied: ${address}`)
    setTimeout(() => {
      setTooltiptext('Click to Copy')
    }, 500)
  }

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
      <Tooltip
        title={tooltiptext}
        placement="top"
        arrow
        sx={{
          cursor: 'pointer',
          marginLeft: '0.5rem'
        }}
      >
        <ContentCopyIcon
          sx={styles.copy}
          onClick={(e) => {
            copyAddress('address')
            e.stopPropagation()
          }}
        />
      </Tooltip>
    </Box>
  )
}
