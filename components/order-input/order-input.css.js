import styled from 'styled-components'

export const Input = styled.input`
  flex: 1 1 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray['900']};
  border: 2px solid ${({ theme }) => theme.colors.gray['700']};
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  padding-right: 4.5rem;
  color: ${({ theme }) => theme.colors.gray['000']};
  text-align: right;
  font-size: 1rem;
  line-height: 1;

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.colors.gray['400']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray['600']};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &[read-only] {
    pointer-events: none;
  }
`

export const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  position: relative;
  margin-bottom: 1rem;

  ${Input} {
    &:focus {
      box-shadow: 0 0 0 0.2rem ${({ orderType }) => (orderType === 'sell' ? '#b23639' : '#4b9064')};
    }
  }
`

const InputLabel = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray['500']};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
`

export const Label = styled(InputLabel)`
  left: 0.875rem;
`

export const Asset = styled(InputLabel)`
  right: 1.25rem;
  width: 2.75rem;
  font-family: ${({ isCondensed }) => (isCondensed ? `'Open Sans Condensed'` : 'inherit')};
`
