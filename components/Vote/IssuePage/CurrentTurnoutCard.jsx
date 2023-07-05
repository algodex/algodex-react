import React from 'react'
import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'
import useTranslation from 'next-translate/useTranslation'

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
function CurrentTurnoutCard() {
  const { t } = useTranslation('vote')

  return (
    <>
      <CurrentTurnout>
        <CardTopContainer>
          <p>{t('Current Turnout')}:</p>
        </CardTopContainer>
        <CurrentTurnoutBottomContainer>
          <Progress>
            <CircularProgressContainer>
              <CircularProgress
                variant="determinate"
                value={18}
                size={50}
                thickness={6}
                className={'foreground'}
              />
              <CircularProgress variant="determinate" value={100} size={50} thickness={6} />
            </CircularProgressContainer>

            <p>18%</p>
          </Progress>
          <Amount>
            <p>14,567 / 87,900 ALGX</p>
          </Amount>
        </CurrentTurnoutBottomContainer>
      </CurrentTurnout>
    </>
  )
}

export default CurrentTurnoutCard
