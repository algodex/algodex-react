import Head from 'next/head'
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
        <title>Documentation</title>
      </Head>
      <Header />
      <iframe
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        title="about"
        src={
          activeNetwork == 'mainnet'
            ? 'https://about.algodex.com/docs/algodex-trading-guide-mainnet/'
            : 'https://about.algodex.com/docs/trading-algorand-standard-assets-testnet/'
        }
      />
    </>
  )
}
export default DocsPage
