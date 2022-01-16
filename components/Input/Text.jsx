import styled, { StyledComponent } from 'styled-components'

/**
 * @param {object} props Component Properties
 * @param {string} props.type Input Type
 * @param {boolean} props.hasOutline Enable Outline
 * @param {boolean} props.hasBackgroundColor Enable Backgroung Color
 * @type {StyledComponent}
 */
export const TextInput = styled.input.attrs(({ type, hasOutline, hasBackgroundColor }) => ({
  type,
  hasOutline,
  hasBackgroundColor
}))`
  flex: 1 1 auto;
  background-color: ${({ theme, hasBackgroundColor }) =>
    hasBackgroundColor ? theme.colors.gray['900'] : 'inherit'};
  border: ${({ theme, hasOutline }) =>
    hasOutline ? `2px solid ${theme.colors.gray['700']}` : 'none'};
  border-radius: 3px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.gray['000']};
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-size: 1rem;
  line-height: 1;
  min-height: 2.5rem;

  // &:focus {
  //   outline: 0;
  //   box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
  //   border-color: ${({ theme }) => theme.colors.gray['400']};
  // }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray['600']};
    font-size: medium;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.33;
  }

  &[read-only] {
    pointer-events: none;
  }
`

TextInput.defaultProps = {
  type: 'text',
  hasOutline: true,
  hasBackgroundColor: true
}

export default TextInput
