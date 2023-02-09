import React, { useState } from 'react'
import { styles } from './styles.css'

//MUI components
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Tooltip from '@mui/material/Tooltip'

export const CopyIcon = ({
  content,
  tooltipStyles
}: {
  content: string | number
  tooltipStyles?: object
}) => {
  const [tooltiptext, setTooltiptext] = useState('Click to Copy')

  const copyAddress = (address: string | number) => {
    document.querySelector('.copyToClipboard')
    navigator.clipboard.writeText(address.toString())
    setTooltiptext(`Copied: ${address}`)
    setTimeout(() => {
      setTooltiptext('Click to Copy')
    }, 500)
  }
  return (
    <Tooltip
      title={tooltiptext}
      placement="top"
      arrow
      sx={{
        cursor: 'pointer',
        marginLeft: '0.5rem',
        ...tooltipStyles
      }}
    >
      <ContentCopyIcon
        sx={styles.copy}
        onClick={(e) => {
          copyAddress(content)
          e.stopPropagation()
        }}
      />
    </Tooltip>
  )
}
