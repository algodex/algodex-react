import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ columns = 8 }) => `repeat(${columns}, minmax(50px, 1fr))`};
  grid-column: ${({ columns = 8 }) => `span ${columns}`};
  padding: 1.5rem 2rem 0.5rem 2rem;
  gap: 0 1rem;
`
export const ColumnTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  width: 100%;
  height: 100%;
`
