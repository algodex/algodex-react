import { TabPanelUnstyled, TabsListUnstyled, TabsUnstyled, buttonUnstyledClasses } from '@mui/base'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'

import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
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

const TabsWrapper = styled(Tabs)`
  .MuiTabs-indicator {
    height: 5px;
    background-color: white;
  }
  .MuiTab-textColorPrimary {
    &:hover {
      color: #fff;
    }
  }
`
const TabItemWrapper = styled(Tab)`
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

export function TabsComponent({
  tabsList,
  action,
  hasPanel,
  size,
  type,
  activeTab,
  setActiveTab,
  onChange,
  panelList
}) {
  const handleChange = (event, value) => {
    // setValue(newValue)
    console.log(event, value, 'new value')
    setActiveTab(value)
    // onChange(event, newValue)
  }

  const renderButtonTab = () => {
    return (
      <TabsUnstyled className="w-full" defaultValue={0} onChange={handleChange}>
        <TabsList value={activeTab}>
          <TabBtnItem className="first-item">
            <div
              className={`py-3 py-4 w-full ${
                activeTab === 0 && 'bg-red-700 hover:bg-red-500 rounded-l-lg'
              }`}
            >
              Buy
            </div>
          </TabBtnItem>
          <TabBtnItem className="last-item">
            <div
              className={`py-3 py-4 w-full ${
                activeTab === 1 && 'bg-green-600 rounded-r-lg hover:bg-green-500'
              }`}
            >
              Sell
            </div>
          </TabBtnItem>
        </TabsList>
        {hasPanel && (
          <>
            <TabPanel value={0}>First content</TabPanel>
            <TabPanel value={1}>Second content</TabPanel>
          </>
        )}
      </TabsUnstyled>
    )
  }

  const renderNativeTab = () => {
    return (
      <TabsUnstyled defaultValue={0} sx={{ width: '100%' }}>
        <TabsWrapper
          style={{ marginBottom: '16px', borderBottom: 'solid 1px' }}
          value={activeTab}
          textColor="primary"
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <TabItemWrapper value={0} label="Item One" />
          <TabItemWrapper value={1} label="Item Two" />
        </TabsWrapper>

        <TabPanelWrapper value={activeTab} index={0}>
          First content
        </TabPanelWrapper>
        <TabPanelWrapper value={activeTab} index={1}>
          Second content
        </TabPanelWrapper>
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

TabsComponent.propTypes = {
  tabsList: PropTypes.elementType,
  action: PropTypes.func,
  hasPanel: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  activeTab: PropTypes.number,
  panelList: PropTypes.elementType,
  onChange: PropTypes.func,
  setActiveTab: PropTypes.func
}

export default TabsComponent
