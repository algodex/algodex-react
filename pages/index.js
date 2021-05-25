import Head from 'next/head'
import styled from 'styled-components'
import Welcome from '../components/welcome'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
        <meta name="description" content="Decentralized exchange for trading Algorand ASAs" />
      </Head>

      <Main>
        <Welcome />
      </Main>
    </Container>
  )
}
