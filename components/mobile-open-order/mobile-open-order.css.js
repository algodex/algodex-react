import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 4fr;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  min-height: 5rem;
  position: relative;
`
export const Pair = styled.span`
  grid-column: 1/3;
  grid-row: 1/2;
`

export const Date = styled.div`
  grid-column: 1/3;
  margin-top: 0.25rem;
`

export const Type = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
  justify-self: flex-end;
`
export const AmountLabel = styled.div`
  grid-column: 1/2
  grid-row: 2/3;
`

export const Amount = styled.div`
  grid-column: 2/3
  grid-row: 2/3;
  justify-self: flex-end;
`

export const OrderInformation = styled.div`
  grid-column: 1/3;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
`
export const PriceLabel = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`

export const Price = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  justify-self: flex-end;
`
export const RoleLabel = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
`

export const Role = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
  justify-self: flex-end;
`

export const CancelButton = styled.button`
  border: ${({ theme }) => `2px solid ${theme.colors.red[700]}`};
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0;
  color: ${({ theme }) => theme.colors.red[700]};
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  grid-column: 1/2;
  grid-row: 4/5;
`
export const FilledContainer = styled.div`
  /* position: absolute; */
  right: 2rem;
  top: 1rem;
  width: 5rem;
  height: 5rem;
  grid-column: 3/4;
  grid-row: 1/5;
  justify-self: flex-end;
`
