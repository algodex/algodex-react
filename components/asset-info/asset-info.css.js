import styled from 'styled-components'
import { ExternalLink } from 'react-feather'

export const Container = styled.div`
  flex: 1 1 0%;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`

export const InfoContainer = styled.div`
  padding: 4rem;
  max-width: 40rem;
`

export const ButtonText = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  display: flex;
  align-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[400]};
  padding: 5px 0;

  div {
    line-height: 24px;
    margin-left: 5px;
  }
  
`

export const HeaderContainer = styled.div`
  padding-bottom: 2rem;

  h2 {
    > span {
      white-space: nowrap;

      svg {
        position: relative;
        top: -0.125rem;
      }
    }
  }
`

export const AssetUrl = styled.p`
  a {
    color: ${({ theme }) => theme.colors.gray[400]};
    text-decoration: none;
    transition: color 100ms;

    &:hover {
      color: ${({ theme }) => theme.colors.gray[100]};
    }
  }
`

export const InfoList = styled.dl`
  display: flex;
  flex-wrap: wrap;
`

export const InfoItem = styled.div`
  flex: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};
  margin-bottom: 2rem;
`

export const ExternalLinkIcon = styled(ExternalLink)`
  stroke: ${({ theme }) => theme.colors.gray[500]};
  width: 1rem;
  height: 1rem;
`

export const AlgoExplorerLink = styled.div`
  margin-top: 1.25rem;

  a {
    display: inline-flex;
    align-items: center;

    img {
      opacity: 0.75;
      transition: opacity 100ms;
    }

    &:hover {
      img {
        opacity: 1;
      }
    }

    ${ExternalLinkIcon} {
      position: relative;
      top: -0.1875rem;
      margin-left: 0.5rem;
    }
  }
`
