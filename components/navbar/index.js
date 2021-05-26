import { ReactSVG } from 'react-svg'
import styled from 'styled-components'
import { Bar } from './bar.css'
import { Container } from './container.css'
import Link from 'next/link'

const Logo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
`

export default function Navbar() {
  return (
    <Bar>
      <Container>
        <Link href="/">
          <a>
            <Logo src="/logo-inline-light.svg" />
          </a>
        </Link>
      </Container>
    </Bar>
  )
}
