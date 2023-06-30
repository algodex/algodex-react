import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import OpenVoteCard from './OpenVoteCard'

const StyledTabs = styled(Tabs)`
  margin-top: 20px;

  .MuiTabs-flexContainer {
    justify-content: center;

    @media (min-width: 1024px) {
      justify-content: space-between;
      max-width: 540px;
    }
  }
  .Mui-selected {
    color: white !important;
  }
  .MuiTabs-indicator {
    background-color: #38a169;
    height: 3px;
  }

  @media (min-width: 1024px) {
    padding-left: 160px;
  }
`
const StyledTab = styled(Tab)`
  color: #718096;
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  line-height: 14.52px;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 16.94px;
  }
`

function TabPanel(props) {
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
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function VoteTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '#4A5568', alignContent: 'center' }}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Open Votes" {...a11yProps(0)} />
          <StyledTab label="Upcoming Votes" {...a11yProps(1)} />
          <StyledTab label="Past Votes" {...a11yProps(2)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OpenVoteCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}
export default VoteTabs
