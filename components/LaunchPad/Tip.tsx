import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

// Custom Components
import Tooltip from '@/components/Tooltip'

export const Tip = ({ tip }: { tip: string }) => {
  return (
    <Tooltip
      renderButton={(setTriggerRef) => (
        <InfoOutlinedIcon
          ref={setTriggerRef}
          sx={{ color: 'gray.500', fontSize: '16px', ml: '5px', cursor: 'pointer' }}
        />
      )}
    >
      <Typography
        sx={{
          fontSize: '12px',
          color: 'white',
          lineHeight: 1.4,
          fontStyle: 'normal'
        }}
      >
        {tip}
      </Typography>
    </Tooltip>
  )
}
