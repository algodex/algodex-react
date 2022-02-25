import styled, { keyframes } from '@emotion/styled'

const move = keyframes`
  0% {
    transform: scale(1.1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.15);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
}
`

export const Float = styled.div`
  background-color: ${({ theme }) => theme.colors.gray['000']};
  padding: 1.3rem;
  width: fit-content;
  position: fixed;
  bottom: 0;
  right: 0;
  ul {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    li {
      color: ${({ theme }) => theme.colors.gray['800']};
      cursor: pointer;
      font-size: 1.5rem;
      transition: 0.3s ease all;
      &:hover {
        animation: ${move} 0.3s linear;
      }
    }
  }
`
