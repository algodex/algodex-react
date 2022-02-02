import { TabPanelUnstyled, TabsListUnstyled, buttonUnstyledClasses } from '@mui/base'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'

import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { lighten } from 'polished'
import { styled } from '@mui/system'
import theme from '../../theme'

// import { useState } from 'react'

export const BtnTabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  border-radius: 7px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  &:hover {
    // background-color: ${theme.colors.gray['700']};
  }
`

export const BtnTabItem = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  width: 100%;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  // height: 0;
  &.first-item {
    &:hover {
      background-color: ${lighten(0.05, theme.colors.gray['700'])};
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }
  }
  &.last-item {
    &:hover {
      background-color: ${lighten(0.05, theme.colors.gray['700'])};
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
    }
  }

  &:focus {
    // color: #fff;
  }
  &.${tabUnstyledClasses.selected} {
    // background-color: ${lighten(0.05, theme.colors.green['700'])};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const TabPanel = styled(TabPanelUnstyled)`
  // width: 100%;
`

export const NativeTabsList = styled(Tabs)`
  border-bottom: solid 1px ${theme.colors.gray['700']};
  .MuiTabs-indicator {
    height: 5px;
    background-color: ${theme.colors.green['600']};
  }
  .MuiTab-textColorPrimary {
    &:hover {
      color: #fff;
    }
  }
`

export const NativeTabItem = styled(Tab)`
  color: ${theme.colors.gray['500']};
  &.${tabUnstyledClasses.selected} {
    color: #fff;
  }
`

function TabPanelWrapper(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanelWrapper.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}
