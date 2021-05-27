import { StyledLink } from './welcome.css'
import { Title } from '../type'

export default function Welcome() {
  return (
    <>
      <Title color="gray.800" mb={16} textAlign="center">
        Welcome to <StyledLink href="https://www.algodex.com/">Algodex</StyledLink>
      </Title>
    </>
  )
}
