import Head from 'next/head'
import Header from 'components/header'

/**
 * Documentation Landing Page
 * @todo: Bring in the algodex docs
 * @returns {JSX.Element}
 * @constructor
 */
const DocsPage = () => {
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
        src={'https://about.algodex.com/docs/trading-algorand-standard-assets-testnet/'}
      />
    </>
  )
}
export default DocsPage
