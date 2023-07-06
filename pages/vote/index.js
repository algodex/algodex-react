import Head from 'next/head'
import Header from '../../components/Nav/Header'
import Banner from '../../components/Vote/Homepage/Banner'
import VoteTabs from '../../components/Vote/Homepage/VoteTabs'

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
