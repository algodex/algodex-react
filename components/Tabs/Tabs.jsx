import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'

import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Tab from '@mui/material/Tab'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import Tabs from '@mui/material/Tabs'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import Typography from '@mui/material/Typography'
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import { lighten } from 'polished'
import { styled } from '@mui/system'
import theme from '../../theme'
import { useState } from 'react'

const TabBtnItem = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  width: 100%;
  border-radius: 0px;
  display: flex;
  justify-content: center;

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
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const TabPanel = styled(TabPanelUnstyled)`
  // width: 100%;
`
const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${theme.colors.gray['700']};
  border-radius: 7px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`

const TabsMain = styled(Tabs)`
  .MuiTabs-indicator {
    height: 5px;
    background-color: white;
  }
  .MuiTab-textColorPrimary {
    color: ${theme.colors.gray['600']};
    &:hover {
      color: ${theme.colors.gray['400']};
    }
  }
`
const NativeTabItem = styled(Tab)`
  &.${tabUnstyledClasses.selected} {
    color: #fff;
  }
`

export function TabsComponent() {
  const [value, setValue] = useState(0)
  const [type, setType] = useState('native')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderButtonTab = () => {
    return (
      <TabsUnstyled defaultValue={0} onChange={handleChange}>
        <TabsList value={value}>
          <TabBtnItem className="first-item">
            <div
              className={`py-3 py-4 w-full ${
                value === 0 && 'bg-red-700 hover:bg-red-500 rounded-l-lg'
              }`}
            >
              Buy
            </div>
          </TabBtnItem>
          <TabBtnItem className="last-item">
            <div
              className={`py-3 py-4 w-full ${
                value === 1 && 'bg-green-600 rounded-r-lg hover:bg-green-500'
              }`}
            >
              Sell
            </div>
          </TabBtnItem>
        </TabsList>
        <TabPanel value={0}>First content</TabPanel>
        <TabPanel value={1}>Second content</TabPanel>
      </TabsUnstyled>
    )
  }

  function NativeTabPanel(props) {
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

  NativeTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  }

  const renderNativeTab = () => {
    return (
      <TabsUnstyled defaultValue={0} sx={{ width: '100%' }}>
        <TabsMain
          style={{ marginBottom: '16px', borderBottom: 'solid 1px' }}
          value={value}
          textColor="primary"
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <NativeTabItem value={0} label="Item One" />
          <NativeTabItem value={1} label="Item Two" />
        </TabsMain>

        <NativeTabPanel value={value} index={0}>
          First content
        </NativeTabPanel>
        <NativeTabPanel value={value} index={1}>
          Second content
        </NativeTabPanel>
      </TabsUnstyled>
    )
  }

  return (
    <>
      {type === 'button' && renderButtonTab()}
      {type === 'native' && renderNativeTab()}
    </>
  )
}

export default TabsComponent
