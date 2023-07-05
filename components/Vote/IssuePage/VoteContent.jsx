import React from 'react'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

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

function VoteContent() {
  const { t } = useTranslation('vote')
  return (
    <>
      <Container>
        <ContentContainer>
          <Headingcontainer>
            <VoteNow>{t('Vote Now')}</VoteNow>
            <Title>Title / Question for Vote</Title>
            <VotingDate>{t('Voting started')}: June 1, 2023, 14:00 GMT</VotingDate>
            <VotingDate>{t('Voting ends')}: June 18, 2023, 14:00 GMT</VotingDate>
          </Headingcontainer>
          <Description>
            Porta arcu amet ut nunc fe ugiat mauris. Consectetur nunc ullamcorper tincidunt aenean
            lobortis nulla nunc facilisis. Gravida neque orci gravida urna et pulvinar. Ullamcorper
            congue sed libero at quis iaculis proin varius. Sagittis rhoncus condimentum scelerisque
            gravida.
            <br />
            <br />
            Neque gravida quam in ornare elementum elementum aliquam id. Viverra facilisi sagittis
            et dictum risus. Ornare risus enim feugiat porttitor tempus gravida.
            <br />
            <br />
            Posuere odio sit amet scelerisque. Elementum vulputate pulvinar diam habitasse diam
            purus convallis volutpat. Non faucibus diam dictum eu. At imperdiet id sed pharetra. In
            proin eleifend rutrum tortor pharetra sit lacus sed viverra. Malesuada ullamcorper sit
            donec sed in. Nulla lacinia lorem diam non. Augue sed neque sed arcu diam fringilla sit.
          </Description>
        </ContentContainer>
      </Container>
    </>
  )
}

export default VoteContent
