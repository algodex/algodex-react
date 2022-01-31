import Head from 'next/head'
import Header from 'components/Nav/Header'

/**
 * About Page
 *
 * @todo Bring about from Algodex
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <iframe
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        title="about"
        src={'https://about.algodex.com/'}
      />
    </>
  )
}
export default AboutPage
