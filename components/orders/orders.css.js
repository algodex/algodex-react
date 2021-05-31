import styled from 'styled-components'

export const DateSection = styled.section`
  grid-area: date;
`
export const PairSection = styled.section`
  grid-area: pair;
`
export const TypeSection = styled.section`
  grid-area: type;
`
export const PriceSection = styled.section`
  grid-area: price;
`
export const SideSection = styled.section`
  grid-area: side;
`
export const AmountSection = styled.section`
  grid-area: amount;
`
export const TotalSection = styled.section`
  grid-area: total;
`

export const CancelSection = styled.section`
  grid-area: cancel;
`

export const CancelButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  transition: all 0.1s ease-in;
  color: ${({ theme }) => theme.colors.green[500]};
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.1rem;
  cursor: pointer;
  justify-content: flex-end;
  width: 100%;
`

export const HeaderSection = styled.section`
  display: flex;
  padding: 0 2rem;
  border: ${({ theme }) => theme.colors.gray[700]} 1px solid;

  & > *:not(:last-child) {
    margin-right: 6rem;
  }
`

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.1rem;
`

export const TableSection = styled.main`
  padding: 1rem 2rem;
  width: 100%;
  display: grid;

  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: 2fr repeat(7, 1fr);
  grid-template-areas: 'date pair type side price amount total cancel cancel';
  & > section {
    display: block;
  }
`

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[900]};
  grid-area: orders;
`
