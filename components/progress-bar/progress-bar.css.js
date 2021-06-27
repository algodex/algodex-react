import styled from 'styled-components'

export const Bar = styled.progress`
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ::-webkit-progress-bar {
    margin-top: 6px;
    height: 5px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.gray[700]};
  }

  ::-webkit-progress-value {
    margin-top: 6px;
    height: 5px;
    border-radius: 10px;
    background-color: ${({ theme, orderType }) => {
      return orderType === 'BUY' ? theme.colors.green[500] : theme.colors.red[500]
    }};
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Percent = styled.span`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: 0.7rem;
`
