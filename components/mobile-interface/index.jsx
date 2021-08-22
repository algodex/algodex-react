import styled from 'styled-components'
import SvgImage from 'components/svg-image'
import { HeaderLg, HeaderSm } from 'components/type'

const Container = styled.div`
  height: 100%;
  background: url('/coming-soon-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: none;
  }
`

const TypeContainer = styled.div`
  padding: 15vh 2rem 0;
  text-align: center;
`

const LogoContainer = styled.div`
  padding: 4rem;
`

export default function MobileInterface() {
  return (
    <Container>
      <TypeContainer>
        <HeaderLg fontSize="3.25rem" fontWeight="800" color="gray.000" mb={4}>
          Coming soon
        </HeaderLg>
        <HeaderSm as="p" fontSize="1.25rem" fontWeight="500" letterSpacing="0" color="gray.000">
          The Algodex mobile experience will be available in a later release.
        </HeaderSm>
      </TypeContainer>
      <LogoContainer>
        <SvgImage use="logoLg" w={7.5} />
      </LogoContainer>
    </Container>
  )
}
