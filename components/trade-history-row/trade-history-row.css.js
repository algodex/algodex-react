import styled from 'styled-components'

export const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
  grid-column: span 7;
  width: 100%;
  gap: 0 1rem;
`

export const RowItem = styled.span`
  padding: 0.5rem 0;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  font-size: 0.75rem;
  color: ${({ theme, color = null }) =>
    color ? theme.colors[color][500] : theme.colors.gray[100]};
  justify-content: ${({ justify = 'flex-start' }) => justify};
`
