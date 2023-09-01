import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/Nav/Header'
import Banner from '../../components/Vote/Homepage/Banner'
import VoteTabs from '../../components/Vote/Homepage/VoteTabs'
import useVoteSubmit from '@/hooks/useVoteSubmit'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider.js'
const VotePage = () => {
  const { checkAppsLocalState, appsLocalState } = useVoteSubmit()
  const { activeWallet } = useContext(WalletReducerContext)

  useEffect(() => {
    if (activeWallet !== null) {
      checkAppsLocalState(activeWallet?.address)
    }
    if (activeWallet === null) {
      checkAppsLocalState()
    }
  }, [activeWallet])
  return (
    <>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
      </Head>
      <Header />
      <Banner />
      <VoteTabs appsLocalState={appsLocalState} />
    </>
  )
}

export default VotePage
