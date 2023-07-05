import React from 'react'
import styled from '@emotion/styled'
import LinearProgress from '@mui/material/LinearProgress'

const CurrentLiveResultsContainer = styled.div`
  color: white;
  font-family: Inter;
  height: auto;
  margin: auto;
  margin-top: 16px;
  padding-bottom: 19px;
  width: 94%;

  @media (min-width: 1024px) {
    max-width: 396px;
    margin: inherit;
    margin-bottom: 19px;
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
const CurrentLiveResultsBottomContainer = styled.div`
  background: #4a5568;
  border-radius: 0px 0px 8px 8px;
  padding-bottom: 14px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;

  @media (min-width: 1024px) {
    padding-left: 22px;
    padding-right: 22px;
    padding-top: 12px;
  }
`
const OptionContainer = styled.div`
  padding-bottom: 22px;

  .MuiLinearProgress-root {
    background-color: #7a8693;
    height: 6px;
  }
  .MuiLinearProgress-bar {
    background-color: white;
  }
`
const Option = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  margin-top: 0px;
  text-align: left;
`
const NumbersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
`
const VoteNumbers = styled.p`
  color: #acbcd3;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  margin: 0;
  text-align: left;
`
const Percentage = styled.p`
  color: #acbcd3;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  margin: 0;
  text-align: left;
`

function CurrentLiveResultsCard() {
  return (
    <>
      <CurrentLiveResultsContainer>
        <CardTopContainer>
          <p>Current Live Results:</p>
        </CardTopContainer>
        <CurrentLiveResultsBottomContainer>
          <OptionContainer>
            <Option>Pineapple</Option>
            <LinearProgress variant="determinate" value={42.3} />
            <NumbersContainer>
              <VoteNumbers>5,687 Votes</VoteNumbers>
              <Percentage>42.3%</Percentage>
            </NumbersContainer>
          </OptionContainer>
          <OptionContainer>
            <Option>Pepperoni</Option>
            <LinearProgress variant="determinate" value={22.3} />
            <NumbersContainer>
              <VoteNumbers>3,103 Votes</VoteNumbers>
              <Percentage>22.3%</Percentage>
            </NumbersContainer>
          </OptionContainer>
          <OptionContainer>
            <Option>Cheese</Option>
            <LinearProgress variant="determinate" value={19.3} />
            <NumbersContainer>
              <VoteNumbers>2,908 Votes</VoteNumbers>
              <Percentage>19.3%</Percentage>
            </NumbersContainer>
          </OptionContainer>
          <OptionContainer>
            <Option>Other</Option>
            <LinearProgress variant="determinate" value={12.3} />
            <NumbersContainer>
              <VoteNumbers>1,678 Votes</VoteNumbers>
              <Percentage>12.3%</Percentage>
            </NumbersContainer>
          </OptionContainer>
        </CurrentLiveResultsBottomContainer>
      </CurrentLiveResultsContainer>
    </>
  )
}

export default CurrentLiveResultsCard
