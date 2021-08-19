import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HeaderSm, BodyCopySm } from 'components/type'

export const EmptyState = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.125rem;
  text-align: center;
`

const TestnetGate = ({ children, hasAccess }) => {
  return hasAccess ? (
    children
  ) : (
    <EmptyState>
      <HeaderSm color="gray.100" m={0} mb={16}>
        Welcome to the party!
      </HeaderSm>
      <BodyCopySm color="gray.500" m={0}>
        Oh... sorry. You&apos;re not invited. :/
      </BodyCopySm>
    </EmptyState>
  )
}

TestnetGate.propTypes = {
  children: PropTypes.node,
  hasAccess: PropTypes.bool
}

export default TestnetGate
