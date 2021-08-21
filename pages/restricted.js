import styled from 'styled-components'
import { HeaderSm, BodyCopySm } from 'components/type'

export const Container = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.125rem;
  text-align: center;
`

const Restricted = () => {
  return (
    <Container>
      <HeaderSm color="gray.100" m={0} mb={16}>
        Welcome to the party!
      </HeaderSm>
      <BodyCopySm color="gray.500" m={0}>
        Oh... sorry. You&apos;re not invited. :/
      </BodyCopySm>
    </Container>
  )
}

export default Restricted
