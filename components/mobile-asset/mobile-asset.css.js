import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
  min-height: 3rem;
  position: relative;
`
export const LeftColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const RightColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
`
