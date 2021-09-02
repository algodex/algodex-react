import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.gray['400']};
`

export default function Custom404() {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
    </Container>
  )
}
