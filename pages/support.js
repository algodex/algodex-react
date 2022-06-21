import Head from 'next/head'
import Header from 'components/Nav/Header'
import { SupportForm } from '@/components/SupportForm'

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
        <title>Support | Algodex</title>
      </Head>
      <Header />
      <SupportForm />
    </>
  )
}
export default SupportPage
