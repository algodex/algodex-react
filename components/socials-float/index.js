import { Icon } from '@iconify/react'
import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

export const SocialsFloat = () => {
  const Float = styled.div`
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
      a {
        color: ${({ theme }) => theme.colors.gray['800']};
        font-size: 1.5rem;
      }
    }
  `

  return (
    <Float className="drop-shadow-lg">
      <ul>
        <li className="my-3">
          <a href="https://twitter.com/AlgodexOfficial" target="_blank">
            <Icon icon="brandico:twitter-bird" />
          </a>
        </li>
        <li className="my-3">
          <a href="https://t.me/algodex" target="_blank">
            <Icon icon="file-icons:telegram" />
          </a>
        </li>
        <li className="my-3">
          <a href="https://www.reddit.com/r/Algodex/" target="_blank">
            <Icon icon="fontisto:reddit" />
          </a>
        </li>
      </ul>
    </Float>
  )
}
