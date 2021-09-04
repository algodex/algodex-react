import styled from 'styled-components'

export const Container = styled.div`
  max-height: calc(var(--vh, 1vh) * 100);;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);;
  overflow: hidden;

  // for demo
  p.demo {
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray['600']};
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`

export const StatusContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
`
