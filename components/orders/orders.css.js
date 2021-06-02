import styled from 'styled-components'

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray[400]};
  line-height: 1.5;
  font-size: 0.9rem;
  flex-grow: 1;
`

export const ColumnHead = styled.span`
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

export const AssetsPlaceholder = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
`
export const HistoryPlaceholder = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
`

export const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[700]};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 3px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #${({ theme }) => theme.colors.gray[500]};
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.colors.gray[700]};
  }

  overflow: auto;
  /* 
  @media (min-width: 1536px) {
    overflow: hidden;
  } */
`

export const CancelButton = styled.button`
  display: flex;
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
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: ${({ theme }) => theme.colors.gray[700]} 1px solid;

  & > *:not(:last-child) {
    margin-right: 0;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
    & > *:not(:last-child) {
      margin-right: 6rem;
    }
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
  display: grid;
  position: relative;
  flex-grow: 1;
  padding: 0 2rem;
  gap: 0 1rem;

  /* grid-template-columns: repeat(auto-fit, minmax(50px, 1fr)); */
  grid-template-columns: ${({ columns = 8 }) => `repeat(${columns}, minmax(50px, 1fr))`};
  grid-template-rows: repeat(auto-fit, 35px);
`

export const Container = styled.section`
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.gray[900]};
  grid-area: orders;
`

export const TableHeader = styled.ul`
  padding: 0 2rem;
  margin: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(8, minmax(50px, 1fr));
  grid-column: span 8;
  width: 100%;
`
