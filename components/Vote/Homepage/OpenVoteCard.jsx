import React from 'react'
import styled from '@emotion/styled'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

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
  width: 100%;
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

function OpenVoteCard() {
  const { t } = useTranslation('vote')
  return (
    <>
      <Link href={'/vote/open'}>
        <CardContainer>
          <HeadingContainer>
            <LeftHeadingContainer>
              <TitleContainer>
                <CheckboxContainer>
                  <img src={'/VoteCardCheckbox.svg'} alt="Voting Card Checkbox" />
                </CheckboxContainer>
                <Title>Title / Question for Vote</Title>
              </TitleContainer>
              <VotingDate>{t('Voting ends')}: June 18, 2023, 14:00 GMT</VotingDate>
            </LeftHeadingContainer>
            <RightArrowContainer>
              <ArrowForwardIosIcon />
            </RightArrowContainer>
          </HeadingContainer>
          <Description>
            Porta arcu amet ut nunc feugiat mauris. Consectetur nunc ullamcorper tincidunt aenean
            lobortis nulla nunc facilisis. Gravida neque orci gravida urna et pulvinar. Ullamcorper
            congue sed libero at quis iaculis proin varius. Sagittis rhoncus condimentum scelerisque
            gravida. Neque gravida quam in ornare elementum elementum aliquam id. Viverra facilisi
            sagittis et dictum risus. Ornare risus enim feugiat porttitor tempus gravida
          </Description>
        </CardContainer>
      </Link>
    </>
  )
}

export default OpenVoteCard
