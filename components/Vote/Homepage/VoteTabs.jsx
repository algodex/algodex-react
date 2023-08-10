import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import VoteCard from './VoteCard'
import styled from '@emotion/styled'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import useTranslation from 'next-translate/useTranslation'
import { votesArray } from '../../../utils/votesData'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const StyledTabs = styled(Tabs)`
  margin-top: 1px;

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
    margin-top: 19px;
    padding-left: 155px;
  }
`
const StyledTab = styled(Tab)`
  color: #718096;
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  justify-content: flex-end;
  line-height: 14.52px;
  padding-bottom: 10px !important;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 16.94px;
    padding-bottom: 18px !important;
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
        <Box sx={{ p: '21px' }}>
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

function VoteTabs({ appsLocalState }) {
  const { t } = useTranslation('vote')
  const [value, setValue] = React.useState(0)

  const today = dayjs().toISOString()

  let openVotes = []
  let upcomingVotes = []
  let pastVotes = []

  let checkDate = (todayDate, startDate, endDate, vote) => {
    if (dayjs(todayDate).isBetween(startDate, endDate)) {
      openVotes.push(vote)
    } else if (dayjs(todayDate).isBefore(dayjs(startDate))) {
      upcomingVotes.push(vote)
    } else {
      pastVotes.push(vote)
    }
  }

  votesArray.forEach((vote) => {
    checkDate(today, vote.startDate, vote.endDate, vote)
  })

  openVotes.sort((a, b) => {
    if (dayjs(a.endDate).isBefore(dayjs(b.endDate))) {
      return -1
    }
  })
  upcomingVotes.sort((a, b) => {
    if (dayjs(a.startDate).isBefore(dayjs(b.startDate))) {
      return -1
    }
  })
  pastVotes.sort((a, b) => {
    if (dayjs(b.endDate).isBefore(dayjs(a.endDate))) {
      return -1
    }
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: '#4A5568',
          alignContent: 'center',
          marginBottom: '3px',
          '@media screen and (min-width: 1024px)': {
            marginBottom: '7px'
          }
        }}
      >
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label={t('Open Votes')} {...a11yProps(0)} />
          <StyledTab label={t('Upcoming Votes')} {...a11yProps(1)} />
          <StyledTab label={t('Past Votes')} {...a11yProps(2)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        {openVotes &&
          openVotes?.map((vote, i) => (
            <VoteCard vote={vote} key={i} appsLocalState={appsLocalState} />
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {upcomingVotes &&
          upcomingVotes?.map((vote, i) => (
            <VoteCard vote={vote} key={i} appsLocalState={appsLocalState} />
          ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {pastVotes &&
          pastVotes?.map((vote, i) => (
            <VoteCard vote={vote} key={i} appsLocalState={appsLocalState} />
          ))}
      </TabPanel>
    </Box>
  )
}
VoteTabs.propTypes = {
  appsLocalState: PropTypes.array
}
export default VoteTabs
