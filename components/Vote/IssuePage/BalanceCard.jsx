import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import useTranslation from 'next-translate/useTranslation'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import dayjs from 'dayjs'

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
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0em;
    line-height: 12px;
    margin: 0 auto;
    text-align: left;
    width: 90%;
  }

  .disabledOptInButton {
    cursor: default;
    background-color: #363b46;
    color: #72767d;
    margin-bottom: 16px;

    :hover {
      background-color: #363b46;
    }
  }

  .disabledReceiveButton {
    cursor: default;
    background-color: #363b46;
    color: #72767d;
    margin-top: 0px;
    margin-bottom: 19px;
    :hover {
      background-color: #363b46;
    }
  }

  @media (min-width: 1024px) {
    padding-top: 21px;
    p {
      font-size: 12px;
      line-height: 15px;
    }
    .disabledOptInButton {
      :hover {
        background-color: #363b46;
      }
    }
    .disabledReceiveButton {
    }
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
  .noWallet {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    height: 41px;
    margin-bottom: 20px;
    margin-top: 26px;
    max-width: 327px;
    width: 100%;

    p {
      font-size: 20px;
      line-height: 24px;
    }
    .noWallet {
      font-size: 18px;
    }
  }
`
const OptInButton = styled(Button)`
  background-color: #38a169;
  border-radius: 2px;
  color: white;
  font-family: Inter;
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
    margin-bottom: 16px;
    width: 290px;
  }
`
const ReceiveButton = styled(Button)`
  background-color: #38a169;
  font-family: Inter;
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
    margin-bottom: 16px;

    width: 290px;
  }
`
const InfoText = styled.p`
  font-size: 12px !important;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0em;
  line-height: 17px;
  padding-bottom: 23px;
  text-align: center !important;

  @media (min-width: 1024px) {
    font-size: 14px !important;
  }
`
function BalanceCard({
  assetId,
  currentBalance,
  balanceBeforeDate,
  optInTxn,
  assetTransferTxn,
  optedIn,
  voted,
  vote
}) {
  const { t } = useTranslation('vote')
  const { activeWallet } = useContext(WalletReducerContext)
  const { startDate, endDate } = vote[0]
  const today = dayjs().toISOString()

  return (
    <>
      <BalanceCardContainer>
        <CardTopContainer>
          <p>{t('Receive Voting Tokens')}:</p>
        </CardTopContainer>
        <BalanceCardBottomContainer>
          <p>
            {t(
              'You need voting tokens to cast your vote. The number of votes you have is based on the amount of ALGX in this wallet at the time the vote opens and when you cast your vote'
            )}
            .
          </p>
          <BalanceDisplay>
            {activeWallet && currentBalance !== true ? (
              currentBalance !== false ? (
                <p>
                  {t('Your ALGX Balance')}: {currentBalance}
                </p>
              ) : (
                <p>{t('Your ALGX Balance')}: 0</p>
              )
            ) : currentBalance == true ? (
              <p>{t('Your ALGX Balance')}:</p>
            ) : (
              <p className="noWallet">{t('Connect wallet for ALGX balance')}</p>
            )}
          </BalanceDisplay>

          {activeWallet && dayjs(today).isBefore(dayjs(startDate)) ? (
            <>
              <OptInButton className="disabledOptInButton">
                {t('Opt in to Voting Token')}
              </OptInButton>
              <InfoText>{t('Voting hasn’t started yet')}.</InfoText>
            </>
          ) : activeWallet && dayjs(today).isAfter(dayjs(endDate)) ? (
            <>
              <OptInButton className="disabledOptInButton">
                {t('Opt in to Voting Token')}
              </OptInButton>
              <InfoText>{t('Voting has ended')}.</InfoText>
            </>
          ) : activeWallet && voted === true ? (
            <>
              <ReceiveButton className="disabledReceiveButton">{t('Receive Tokens')}</ReceiveButton>
              <InfoText>
                {t('This wallet has claimed its voting tokens and has already voted')}.
              </InfoText>
            </>
          ) : activeWallet && (balanceBeforeDate === null || balanceBeforeDate <= 0) ? (
            <>
              <OptInButton className="disabledOptInButton">
                {t('Opt in to Voting Token')}
              </OptInButton>
              <ReceiveButton className="disabledReceiveButton">{t('Receive Tokens')}</ReceiveButton>
              <InfoText>{t('This wallet is not eligible to vote on this issue')}.</InfoText>
            </>
          ) : activeWallet && optedIn === false ? (
            <>
              <OptInButton onClick={() => optInTxn(activeWallet, assetId)}>
                {t('Opt in to Voting Token')}
              </OptInButton>
              <ReceiveButton className="disabledReceiveButton">{t('Receive Tokens')}</ReceiveButton>
              <InfoText>
                {t(
                  'Once opted into the token, you’ll be able to receive your tokens with the button above'
                )}
                .
              </InfoText>
            </>
          ) : activeWallet && optedIn === 'received' ? (
            <>
              <ReceiveButton className="disabledReceiveButton">{t('Receive Tokens')}</ReceiveButton>
              <InfoText>
                {t('This wallet has claimed its voting tokens. Cast your vote below')}.
              </InfoText>
            </>
          ) : activeWallet && optedIn === true ? (
            <>
              <ReceiveButton onClick={() => assetTransferTxn(activeWallet, assetId)}>
                {t('Receive Tokens')}
              </ReceiveButton>
              <InfoText>
                {t(
                  'This wallet has opted into this voting token. Click button above to receive tokens to vote'
                )}
                .
              </InfoText>
            </>
          ) : (
            <>
              <OptInButton className="disabledOptInButton">
                {t('Opt in and Receive Tokens')}
              </OptInButton>
              <InfoText>
                {t('Connect a wallet in header to view eligibility for voting tokens')}
              </InfoText>
            </>
          )}
        </BalanceCardBottomContainer>
      </BalanceCardContainer>
    </>
  )
}
BalanceCard.propTypes = {
  vote: PropTypes.array,
  assetId: PropTypes.number,
  currentBalance: PropTypes.number,
  balanceBeforeDate: PropTypes.number,
  optInTxn: PropTypes.func,
  assetTransferTxn: PropTypes.func,
  optedIn: PropTypes.bool,
  voted: PropTypes.bool
}
export default BalanceCard
