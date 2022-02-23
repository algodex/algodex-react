import Head from 'next/head'
import styled from '@emotion/styled'
import Header from 'components/Nav/Header'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.dark};
  color: ${({ theme }) => theme.palette.gray['400']};
`
const OfflinePage = () => (
  <>
    <Head>
      <title>Internet Error | Algodex</title>
    </Head>
    <Header />
    <Container>
      <h1>You are offline!</h1>
    </Container>
  </>
)
export default OfflinePage
