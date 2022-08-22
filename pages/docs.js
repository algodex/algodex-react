import Head from 'next/head'
import Header from 'components/Nav/Header'
import { useUserStore } from '../store'

/**
 * Documentation Landing Page
 * @todo: Bring in the algodex docs
 * @returns {JSX.Element}
 * @constructor
 */
const DocsPage = () => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)

  return (
    <>
      <Head>
        <title>Docs | Algodex</title>
      </Head>
      <Header />
      <iframe
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        title="about"
        src={activeNetwork == 'mainnet' ? 'https://docs.algodex.com/' : 'https://docs.algodex.com/'}
      />
    </>
  )
}
export default DocsPage
