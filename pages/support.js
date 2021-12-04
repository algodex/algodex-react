import Head from 'next/head'
import Header from 'components/header'

/**
 * Support Page
 * @todo: Add Support
 * @returns {JSX.Element}
 * @constructor
 */
const SupportPage = () => {
  return (
    <>
      <Head>
        <title>Support</title>
      </Head>
      <Header />
      <iframe
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        title="about"
        src={'https://about.algodex.com/support'}
      />
    </>
  )
}
export default SupportPage
