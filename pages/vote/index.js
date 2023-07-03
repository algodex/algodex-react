import Head from 'next/head'
import Header from '../../components/Nav/Header'
import Banner from '../../components/Vote/Banner'
import VoteTabs from '../../components/Vote/VoteTabs'

const VotePage = () => {
  return (
    <>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
      </Head>
      <Header />
      <Banner />
      <VoteTabs />
    </>
  )
}

export default VotePage
