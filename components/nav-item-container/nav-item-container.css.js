import styled from 'styled-components'
import ReactCountryFlag from 'react-country-flag'

export const StyledList = styled.ul`
  display: ${(props) => (props.variant !== 'small' ? 'none' : 'flex')};
  flex-direction: ${(props) => (props.variant === 'large' ? 'row' : 'column')};
  justify-content: space-between;
  align-items: center;
  list-style: none;
  height: 50%;
  width: 100%;
  padding: 0;
  & > *:not(:first-child) {
    margin-left: ${(props) => (props.variant !== 'small' ? '3rem' : 0)};
  }

  @media (min-width: 768px) {
    height: 30%;
    width: auto;
  }

  @media (min-width: 1024px) {
    display: ${(props) => (props.variant !== 'small' ? 'flex' : 'none')};
    height: 100%;
  }
`

export const Flag = styled(ReactCountryFlag)`
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.75rem;
`
