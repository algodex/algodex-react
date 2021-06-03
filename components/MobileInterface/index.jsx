import styled from 'styled-components'

const Container = styled.div`
  height: 100%;

  // for demo
  border: 1px dotted rgba(255, 255, 255, 0.125);

  @media (min-width: 768px) {
    display: none;
  }
`

export default function MobileInterface() {
  return (
    <Container>
      <p className="demo">Mobile interface</p>
    </Container>
  )
}
