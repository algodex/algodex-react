import { StyledLink } from './welcome.css'
import { Title } from '../type'

export default function Welcome() {
  return (
    <>
      <Title color="gray.300" mb={16} textAlign="center" lineHeight={1}>
        Welcome to <StyledLink href="https://www.algodex.com/">Algodex</StyledLink>
      </Title>
    </>
  )
}
