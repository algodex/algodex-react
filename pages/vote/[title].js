import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../../components/Nav/Header'
import BackNavigation from '@/components/Vote/IssuePage/BackNavigation'
import VoteContent from '@/components/Vote/IssuePage/VoteContent'
import BalanceCard from '@/components/Vote/IssuePage/BalanceCard'
import QuestionForm from '@/components/Vote/IssuePage/QuestionForm'
import CurrentTurnoutCard from '@/components/Vote/IssuePage/CurrentTurnoutCard'
import CurrentLiveResultsCard from '@/components/Vote/IssuePage/CurrentLiveResultsCard'
import Banner from '@/components/Vote/Homepage/Banner'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { votesArray } from '../../utils/votesData'
import useVoteSubmit from '@/hooks/useVoteSubmit'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
import useBalanceInfo from '../../hooks/useBalanceInfo'
const DesktopContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding-bottom: 48px;
  width: 100%;
`
const DesktopLeftContainer = styled.div`
  width: 63%;
`
const DesktopRightContainer = styled.div`
  width: 37%;
`
const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.dark};
  color: ${({ theme }) => theme.palette.gray['400']};
`
const OpenIssue = () => {
  const { activeWallet } = useContext(WalletReducerContext)
  const [innerWidth, setInnerWidth] = useState(undefined)
  const [optionsVotes, setOptionsVotes] = useState([])
  const [totalVotes, setTotalVotes] = useState(0)
  const router = useRouter()
  const { title } = router.query
  const vote = votesArray.filter((e) => {
    return e.title === title
  })
  const {
    globalState,
    readGlobalState,
    assetBalance,
    voted,
    decimals,
    voteSubmit,
    active,
    assetId
  } = useVoteSubmit()
  const {
    currentBalance,
    balanceBeforeDate,
    optInTxn,
    assetTransferTxn,
    checkBalanceBeforeDate,
    hasAlgxBalance,
    checkOptIn,
    optedIn
  } = useBalanceInfo()
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    if (vote.length && activeWallet) {
      readGlobalState(vote[0].appId, activeWallet.address)
    }
  }, [activeWallet])
  useEffect(() => {
    if (globalState.length) {
      setOptionsVotes(
        globalState
          .filter((e) => e.key.includes('votes'))
          .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
      )
    }
  }, [globalState])
  useEffect(() => {
    if (optionsVotes.length) {
      let votesSum = 0
      optionsVotes.forEach((e) => (votesSum = votesSum + e.value))
      setTotalVotes(votesSum)
    }
  }, [optionsVotes])
  useEffect(() => {
    if (assetId !== null) {
      hasAlgxBalance(activeWallet)
      checkBalanceBeforeDate(activeWallet)
      checkOptIn(activeWallet, assetId)
    }
  }, [assetId])
  useEffect(() => {
    if (vote.length && activeWallet && optedIn === 'received' && voted === false) {
      readGlobalState(vote[0].appId, activeWallet.address)
    }
  }, [optedIn])

  return (
    <>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      {vote && vote.length ? (
        innerWidth >= 1024 ? (
          <>
            <Banner />
            <DesktopContainer>
              <DesktopLeftContainer>
                <BackNavigation />
                <VoteContent vote={vote} />
                <QuestionForm
                  vote={vote}
                  voteSubmit={voteSubmit}
                  voted={voted}
                  assetBalance={assetBalance}
                  active={active}
                />
              </DesktopLeftContainer>
              <DesktopRightContainer>
                <BalanceCard
                  assetId={assetId}
                  currentBalance={currentBalance}
                  balanceBeforeDate={balanceBeforeDate}
                  optInTxn={optInTxn}
                  assetTransferTxn={assetTransferTxn}
                  optedIn={optedIn}
                  voted={voted}
                />
                <CurrentTurnoutCard />
                <CurrentLiveResultsCard
                  optionsVotes={optionsVotes}
                  options={vote[0].question.options}
                  decimals={decimals}
                  totalVotes={totalVotes}
                />
              </DesktopRightContainer>
            </DesktopContainer>
          </>
        ) : (
          <>
            <BackNavigation />
            <VoteContent vote={vote} />
            <BalanceCard
              assetId={assetId}
              currentBalance={currentBalance}
              balanceBeforeDate={balanceBeforeDate}
              optInTxn={optInTxn}
              assetTransferTxn={assetTransferTxn}
              optedIn={optedIn}
              voted={voted}
            />
            <QuestionForm
              vote={vote}
              voteSubmit={voteSubmit}
              voted={voted}
              assetBalance={assetBalance}
              active={active}
            />
            <CurrentTurnoutCard />
            <CurrentLiveResultsCard
              optionsVotes={optionsVotes}
              options={vote[0].question.options}
              decimals={decimals}
              totalVotes={totalVotes}
            />
          </>
        )
      ) : (
        <NotFoundContainer>
          <h1>404 - Page Not Found</h1>
        </NotFoundContainer>
      )}
    </>
  )
}

export default OpenIssue
