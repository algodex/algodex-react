import React from 'react'

//MUI Components
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const LinearProgressWithLabel = ({
  value,
  label,
  progressStyles,
  ...rest
}: {
  value: number
  label: string
  progressStyles?: object
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          backgroundColor: 'gray.300',
          height: '34px',
          borderRadius: '3px',
          '.MuiLinearProgress-bar': {
            backgroundColor: 'green.500'
          },
          ...progressStyles
        }}
        {...rest}
      />
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          position: 'absolute',
          fontSize: '11px',
          color: 'white',
          bottom: '8px',
          left: '15px'
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
