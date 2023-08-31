import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'
import useTranslation from 'next-translate/useTranslation'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { Fade } from '@mui/material'

const CurrentTurnout = styled.div`
  color: white;
  font-family: Inter;
  margin: auto;
  margin-top: 20px;
  width: 94%;

  @media (min-width: 1024px) {
    margin: inherit;
    margin-bottom: 19px;
    max-width: 396px;
  }
`
const CardTopContainer = styled.div`
  align-items: center;
  background: #2a313c;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  justify-content: space-between;
  height: 36px;
  p {
    color: #d4d4d4;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0em;
    line-height: 17px;
    margin-left: 22px;
    text-align: left;
  }

  @media (min-width: 1024px) {
    p {
      font-size: 16px;
      line-height: 19px;
    }
  }
`
const CurrentTurnoutBottomContainer = styled.div`
  align-items: center;
  background: #4a5568;
  border-radius: 0px 0px 8px 8px;
  display: flex;
  height: 96px;
  text-align: center;
`
const Progress = styled.div`
  align-items: center;
  border-right: 1px solid white;
  display: flex;
  height: 52px;
  justify-content: space-evenly;
  margin-left: 12px;
  width: 45%;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    padding-right: 0px;
    text-align: center;
  }
`
const CircularProgressContainer = styled.div`
  position: relative;

  .foreground {
    position: absolute;
    z-index: 3;

    svg {
      color: #38a169;
    }
  }
  .MuiCircularProgress-root {
    color: #a2c5b2;
    z-index: 1;
  }
`
const Amount = styled.div`
  width: 120px;
  margin: auto;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 29px;
    text-align: center;
  }
`

function CurrentTurnoutCard({ totalVoters, totalHolders }) {
  const { t } = useTranslation('vote')

  return (
    <>
      <CurrentTurnout>
        <CardTopContainer>
          <p>{t('Current Turnout')}:</p>
          <Tooltip
            title="The total turnout number represents the amount of ALGX holders with a balance over 10000."
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top"
            arrow
            sx={{ marginRight: '20px' }}
          >
            <HelpOutlineOutlinedIcon />
          </Tooltip>
        </CardTopContainer>
        <CurrentTurnoutBottomContainer>
          <Progress>
            <CircularProgressContainer>
              <CircularProgress
                variant="determinate"
                value={totalVoters > 0 ? ((totalVoters / totalHolders) * 100).toFixed(2) : 0}
                size={50}
                thickness={6}
                className={'foreground'}
              />
              <CircularProgress variant="determinate" value={100} size={50} thickness={6} />
            </CircularProgressContainer>

            <p>{totalVoters > 0 ? ((totalVoters / totalHolders) * 100).toFixed(2) : 0}%</p>
          </Progress>
          <Amount>
            <p>
              {totalVoters > 0 ? totalVoters : 0} / {totalHolders.toLocaleString('en-US')} ALGX
            </p>
          </Amount>
        </CurrentTurnoutBottomContainer>
      </CurrentTurnout>
    </>
  )
}
CurrentTurnoutCard.propTypes = {
  totalHolders: PropTypes.number,
  totalVoters: PropTypes.number
}
export default CurrentTurnoutCard
