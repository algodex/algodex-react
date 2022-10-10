import styled from '@emotion/styled'
import { variant } from 'styled-system'

/**
 * Button Component
 * @todo refactor to TailwindsCSS
 * @type {StyledComponent}
 */
export const NavButton = styled.button`
  ${variant({
    scale: 'buttons'
  })}

  ${({ block }) =>
    block &&
    `
  display: block;
  width: 100%;
  `};

  padding: ${({ size }) => {
    switch (size) {
      case 'large':
        return '0.875rem 2rem'

      default:
        return '0.5rem 1.5rem'
    }
  }};

  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 50ms ease-in-out;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.33;
  }
`

NavButton.defaultProps = {
  variant: 'secondary',
  type: 'button'
}

export default NavButton
