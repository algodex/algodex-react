import Head from 'next/head'
import Header from 'components/Nav/Header'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: calc(var(--vh, 1vh) * 100);
  height: calc(var(--vh, 1vh) * 100);

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }
`
/**
 * Landing Page
 * @returns {JSX.Element}
 * @constructor
 */
const IndexPage = () => {
  return (
    <Container>
      <Head>
        <title>Algodex | Algorand Decentralized Exchange</title>
      </Head>
      <Header />
      <div>TODO: Landing Page</div>
    </Container>
  )
}
export default IndexPage
