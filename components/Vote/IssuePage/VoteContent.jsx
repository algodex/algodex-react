import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const Container = styled.div`
  color: white;
  font-family: Inter;
`
const ContentContainer = styled.div`
  padding-left: 22px;

  @media (min-width: 1024px) {
    padding-left: 115px;
  }
`
const Headingcontainer = styled.div`
  margin-top: 33px;

  @media (min-width: 1024px) {
    margin-top: 23px;
  }
`
const VoteNow = styled.p`
  display: none;

  @media (min-width: 1024px) {
    align-items: center;
    border-radius: 4px;
    border: 2px solid white;
    display: flex;
    font-family: Inter;
    font-size: 12px;
    font-weight: 700;
    height: 28px;
    justify-content: center;
    margin-bottom: 23px;
    text-transform: uppercase;
    width: 102px;
  }
`
const Title = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 24px;
  margin: 10px 0px;
  text-align: left;

  @media (min-width: 1024px) {
    font-size: 28px;
    line-height: 34px;
    margin: 7px 0px;
  }
`
const VotingDate = styled.p`
  color: #7a8693;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 15px;
  margin: 9px 0px;
  text-align: left;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 17px;
    margin: 7px 0px;
  }
`
const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 15px;
  margin-bottom: 20px;
  margin-top: 34px;
  text-align: left;
  width: 92%;

  @media (min-width: 1024px) {
    font-size: 16px;
    line-height: 20px;
    margin-top: 41px;
    margin-bottom: 40px;
    width: 78%;
  }
`

function VoteContent({ vote }) {
  const { t } = useTranslation('vote')
  const { title, description, startDate, endDate } = vote[0]
  const today = dayjs().toISOString()

  return (
    <>
      <Container>
        <ContentContainer>
          <Headingcontainer>
            <VoteNow>{t('Vote Now')}</VoteNow>
            <Title>{title}</Title>

            {dayjs(today).isBetween(startDate, endDate) ? (
              <>
                <VotingDate>
                  {t('Voting started')}: {dayjs(startDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
                <VotingDate>
                  {t('Voting ends')}: {dayjs(endDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
              </>
            ) : dayjs(today).isBefore(dayjs(startDate)) ? (
              <>
                <VotingDate>
                  {t('Voting starts')}: {dayjs(startDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
                <VotingDate>
                  {t('Voting ends')}: {dayjs(endDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
              </>
            ) : (
              <>
                <VotingDate>
                  {t('Voting started')}: {dayjs(startDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
                <VotingDate>
                  {t('Voting ended')}: {dayjs(endDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
              </>
            )}
          </Headingcontainer>
          <Description>{description}</Description>
        </ContentContainer>
      </Container>
    </>
  )
}
VoteContent.propTypes = {
  vote: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}
export default VoteContent
