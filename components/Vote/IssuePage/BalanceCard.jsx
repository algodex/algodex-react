import React from 'react'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'

const BalanceCardContainer = styled.div`
  color: white;
  font-family: Inter;
  margin: auto;
  width: 94%;

  @media (min-width: 1024px) {
    max-width: 396px;
    margin: inherit;
    margin-bottom: 19px;
    margin-top: 100px;
  }
`
const CardTopContainer = styled.div`
  align-items: center;
  background: #2a313c;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  height: 36px;

  p {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #d4d4d4;
    margin-left: 22px;
  }

  @media (min-width: 1024px) {
    p {
      font-size: 16px;
      font-weight: 700;
      line-height: 19px;
    }
  }
`
const BalanceCardBottomContainer = styled.div`
  background: #4a5568;
  border-radius: 0px 0px 8px 8px;
  padding-top: 9px;
  text-align: center;

  p {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 12px;
    margin: 0 auto;
    text-align: left;
    width: 90%;
  }

  @media (min-width: 1024px) {
    padding-top: 21px;
    p {
        font-size: 12px;
        line-height: 15px;
        
    }
`
const BalanceDisplay = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 2px solid white;
  display: flex;
  height: 32px;
  margin: auto;
  margin-bottom: 22px;
  margin-top: 22px;
  width: 73%;

  p {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0em;
    line-height: 19px;
    text-align: center;
    width: 100%;
  }

  @media (min-width: 1024px) {
    height: 41px;
    margin-bottom: 36px;
    margin-top: 26px;
    max-width: 327px;
    width: 100%;

    p {
      font-size: 20px;
      line-height: 24px;
    }
  }
`
const OptInButton = styled(Button)`
  background-color: #38a169;
  border-radius: 2px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  height: 28px;
  letter-spacing: 0em;
  line-height: 15px;
  margin-bottom: 20px;
  text-align: left;
  text-transform: inherit;
  width: 220px;

  :hover {
    background-color: #38a169;
  }

  @media (min-width: 1024px) {
    font-size: 14px;
    font-weight: 700;
    height: 33px;
    line-height: 17px;
    margin-bottom: 38px;
    width: 290px;
  }
`
const InfoText = styled.p`
  font-size: 14px;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0em;
  line-height: 17px;
  padding-bottom: 23px;
  text-align: center !important;
`
function BalanceCard() {
  return (
    <>
      <BalanceCardContainer>
        <CardTopContainer>
          <p>Receive Voting Tokens:</p>
        </CardTopContainer>
        <BalanceCardBottomContainer>
          <p>
            You need voting tokens to cast your vote. The number of votes you have is based on the
            amount of ALGX in this wallet at the time the vote opens and when you cast your vote.
          </p>
          <BalanceDisplay>
            <p>Your ALGX Balance: 14,494.24</p>
          </BalanceDisplay>
          <OptInButton>Opt in and Receive Tokens</OptInButton>
          {/* <InfoText>
            This wallet has claimed its voting tokens. <br />
            Cast your vote below.
          </InfoText> */}
        </BalanceCardBottomContainer>
      </BalanceCardContainer>
    </>
  )
}

export default BalanceCard