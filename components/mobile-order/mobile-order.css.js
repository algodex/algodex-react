import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  min-height: 3rem;
  position: relative;
`
export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
`
export const Detail = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
export const ProgressBarContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`
export const ColumnContainer = styled.div`
  display: flex;
`
export const CancelButton = styled.button`
  border: ${({ theme }) => `2px solid ${theme.colors.red[700]}`};
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  position: absolute;
  right: 1rem;
  top: 5.5rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0;
  color: ${({ theme }) => theme.colors.red[700]};
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  grid-column: 1/2;
  grid-row: 4/5;
  width: 25%;
  margin-top: 0.5rem;
`
