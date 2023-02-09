import React from 'react'

//MUI Components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Note = ({
  className,
  sx,
  content
}: {
  className?: string
  sx?: object
  content: string
}) => {
  return (
    <Box
      className={`flex p-3 ${className}`}
      sx={{
        backgroundColor: 'rgba(56, 161, 105, 0.2)',
        border: 1,
        borderColor: 'green.500',
        borderRadius: '3px',
        columnGap: '4px',
        ...sx
      }}
    >
      <InfoOutlinedIcon sx={{ color: 'white', fontSize: '16px', ml: '5px' }} />

      <Typography sx={{ fontWeight: 500, fontSize: '12px', color: 'white' }}>{content}</Typography>
    </Box>
  )
}
