import { useEffect, useState } from 'react'
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
  const [innerWidth, setInnerWidth] = useState(undefined)
  const router = useRouter()
  const { title } = router.query

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

  const vote = votesArray.filter((e) => {
    return e.title === title
  })

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
                <QuestionForm vote={vote} />
              </DesktopLeftContainer>
              <DesktopRightContainer>
                <BalanceCard />
                <CurrentTurnoutCard />
                <CurrentLiveResultsCard />
              </DesktopRightContainer>
            </DesktopContainer>
          </>
        ) : (
          <>
            <BackNavigation />
            <VoteContent vote={vote} />
            <BalanceCard />
            <QuestionForm vote={vote} />
            <CurrentTurnoutCard />
            <CurrentLiveResultsCard />
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
