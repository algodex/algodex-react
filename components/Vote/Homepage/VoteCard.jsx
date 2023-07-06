import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const CardContainer = styled.article`
  border-radius: 8px;
  border: 1px solid white;
  color: white;
  font-family: Inter;
  height: 143px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  padding-left: 14px;
  padding-top: 18px;
  cursor: pointer;

  @media (min-width: 1024px) {
    height: 155px;
    margin: auto;
    margin-bottom: 28px;
    padding-bottom: 23px;
    padding-left: 49px;
    padding-top: 23px;
    position: relative;
    width: 93.3%;
  }
`
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const LeftHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
`
const RightArrowContainer = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 16px;
  padding-right: 8px;

  svg {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    bottom: 0;
    padding: 0px;
    position: absolute;
    right: 28px;
    top: 0;

    svg {
      font-size: 28px;
    }
  }
`
const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  height: 20px;
  width: 90%;
`
const CheckboxContainer = styled.div`
  display: flex;
  margin-right: 3px;

  img {
    height: 19px;
    left: -2px !important;
    position: relative;
  }

  @media (min-width: 1024px) {
    position: absolute;
    left: 12px;

    img {
      height: 26px;
      position: static;
    }
  }
`
const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 19.36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 1024px) {
    font-size: 20px;
    line-height: 24.2px;
  }
`
const VotingDate = styled.p`
  color: #7a8693;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  margin: 8px 0px;
  margin-bottom: 10px;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 16.94px;
    margin-top: 11px;
  }
`
const Description = styled.p`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: #7a8693;
  display: -webkit-box;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 14.52px;
  overflow: hidden;
  width: 92%;

  @media (min-width: 1024px) {
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 16.94px;
    margin-top: 0px;
    width: 90%;
  }
`

function VoteCard({ vote }) {
  const { t } = useTranslation('vote')
  const today = dayjs().toISOString()
  console.log(vote)
  const { title, description, startDate, endDate } = vote

  return (
    <>
      <Link href={`/vote/${title}`}>
        <CardContainer>
          <HeadingContainer>
            <LeftHeadingContainer>
              <TitleContainer>
                <CheckboxContainer>
                  <img src={'/VoteCardCheckbox.svg'} alt="Voting Card Checkbox" />
                </CheckboxContainer>
                <Title>{title}</Title>
              </TitleContainer>
              {dayjs(today).isBetween(startDate, endDate) ? (
                <VotingDate>
                  {t('Voting ends')}: {dayjs(endDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
              ) : dayjs(today).isBefore(dayjs(startDate)) ? (
                <VotingDate>
                  {t('Voting starts')}: {dayjs(startDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
              ) : (
                <VotingDate>
                  {t('Voting ended')}: {dayjs(endDate).format('MMMM D, YYYY, HH:mm')}
                </VotingDate>
              )}
            </LeftHeadingContainer>
            <RightArrowContainer>
              <ArrowForwardIosIcon />
            </RightArrowContainer>
          </HeadingContainer>
          <Description>{description}</Description>
        </CardContainer>
      </Link>
    </>
  )
}
VoteCard.propTypes = {
  vote: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}
export default VoteCard
