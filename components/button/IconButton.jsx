import styled from 'styled-components'

/**
 * IconButton
 * @type {StyledComponent}
 * @todo refactor to TailwindsCSS
 */
export const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  margin-left: 0.125rem;
  padding: 0;
  height: 15px;

  svg {
    height: 15px;
    fill: ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`

export default IconButton
