import Head from 'next/head'
import MainLayout from 'components/main-layout'
import Header from 'components/header'

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <MainLayout />
    </>
  )
}
export default IndexPage
