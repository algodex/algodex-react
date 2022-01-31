import { Icon } from '@iconify/react'
import React from 'react'
import { Float } from './styles.css'
import Link from 'next/link'

export const SocialsFloat = () => {
  return (
    <Float className="drop-shadow-lg">
      <ul>
        <li className="my-3">
          <Link href="https://twitter.com/AlgodexOfficial" target="_blank" rel="noreferrer">
            <Icon icon="brandico:twitter-bird" />
          </Link>
        </li>
        <li className="my-3">
          <Link href="https://t.me/algodex" target="_blank" rel="noreferrer">
            <Icon icon="file-icons:telegram" />
          </Link>
        </li>
        <li className="my-3">
          <Link href="https://www.reddit.com/r/Algodex/" target="_blank" rel="noreferrer">
            <Icon icon="fontisto:reddit" />
          </Link>
        </li>
      </ul>
    </Float>
  )
}
