import React from 'react'

//MUI Components
import Typography from '@mui/material/Typography'

export const ErrorMessage = ({
  error,
  name
}: {
  error?: unknown
  name: string
}) => {
  if (error && error[name])
    return (
      <Typography sx={{ fontWeight: 500, fontSize: '12px', color: 'red.500' }}>
        {error[name]}
      </Typography>
    )
  return null
}
