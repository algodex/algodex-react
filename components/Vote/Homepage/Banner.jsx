import React from 'react'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

const Container = styled.div`
  background: rgb(67, 84, 105);
  background: linear-gradient(
    90deg,
    rgba(67, 84, 105, 1) 19%,
    rgba(45, 57, 74, 1) 40%,
    rgba(25, 36, 51, 1) 100%
  );
  font-family: Inter;
  height: 167px;

  @media (min-width: 1024px) {
    display: flex;
    height: 200px;
    flex-direction: row;
    justify-content: space-between;
  }
`
const LeftContainer = styled.div`
  padding-left: 21px;
  padding-top: 17px;

  @media (min-width: 1024px) {
    padding-left: 83px;
    padding-top: 38px;
  }
`
const RightContainer = styled.div`
  display: none;

  @media (min-width: 1344px) {
    display: flex;
    padding-right: 125px;
  }
`
const Title = styled.h2`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2rem;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 20px;
    line-height: 1.5rem;
  }
`
const Subtitle = styled.p`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  line-height: 0.9rem;
  margin-bottom: 26px;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 1rem;
    margin-bottom: 28px;
  }
`
const InfoButton = styled.a`
  align-items: center;
  background-color: #38a169;
  border-radius: 2px;
  color: #ffffff;
  display: flex;
  font-family: Inter;
  font-size: 12px;
  font-weight: 700;
  height: 33px;
  justify-content: center;
  line-height: 14.52px;
  text-decoration: none;
  text-transform: uppercase;
  width: 132px;

  :hover {
    background-color: #38a169;
  }

  @media (min-width: 1024px) {
    width: 176px;
    font-size: 14px;
    line-height: 16.94px;
  }
`

function Banner() {
  const { t } = useTranslation('vote')
  return (
    <>
      <Container>
        <LeftContainer>
          <Title>{t('Have a say in the future of Algodex')}.</Title>
          <Subtitle>
            {t('Receive voting tokens by holding ALGX tokens and vote on proposals')}
          </Subtitle>
          <InfoButton href="https://docs.algodex.com/" target="_blank">
            {t('More Info')}
          </InfoButton>
        </LeftContainer>
        <RightContainer>
          <img src="/vote-banner.png" alt="balance with algodex logo" />
        </RightContainer>
      </Container>
    </>
  )
}

export default Banner
