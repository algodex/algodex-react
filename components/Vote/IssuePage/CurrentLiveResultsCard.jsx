import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import LinearProgress from '@mui/material/LinearProgress'
import useTranslation from 'next-translate/useTranslation'

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

function CurrentLiveResultsCard({ optionsVotes, options, decimals, totalVotes }) {
  const { t } = useTranslation('vote')

  return (
    <>
      <CurrentLiveResultsContainer>
        <CardTopContainer>
          <p>{t('Current Live Results')}:</p>
        </CardTopContainer>
        <CurrentLiveResultsBottomContainer>
          {options.map((e, i) => (
            <OptionContainer key={i}>
              <Option>{e}</Option>
              <LinearProgress
                variant="determinate"
                value={
                  totalVotes > 0 ? ((optionsVotes[i]?.value / totalVotes) * 100).toFixed(2) : 0
                }
              />
              <NumbersContainer>
                <VoteNumbers>
                  {optionsVotes.length
                    ? parseFloat((optionsVotes[i]?.value / Math.pow(10, decimals)).toFixed(2))
                    : 0}{' '}
                  {t('Votes')}
                </VoteNumbers>
                <Percentage>
                  {totalVotes > 0 ? ((optionsVotes[i]?.value / totalVotes) * 100).toFixed(2) : 0}%
                </Percentage>
              </NumbersContainer>
            </OptionContainer>
          ))}
        </CurrentLiveResultsBottomContainer>
      </CurrentLiveResultsContainer>
    </>
  )
}
CurrentLiveResultsCard.propTypes = {
  optionsVotes: PropTypes.array,
  options: PropTypes.array,
  decimals: PropTypes.number,
  totalVotes: PropTypes.number
}
export default CurrentLiveResultsCard
