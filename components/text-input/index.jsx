import styled from 'styled-components'

const TextInput = styled.input.attrs(({ type }) => ({
  type
}))`
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.colors.gray['900']};
  border: 2px solid ${({ theme }) => theme.colors.gray['700']};
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.colors.gray['000']};
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-size: 1rem;
  line-height: 1;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
    border-color: ${({ theme }) => theme.colors.gray['400']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray['600']};
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
  type: 'text'
}

export default TextInput
