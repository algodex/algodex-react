import React from 'react'
import { Container } from '@/components/About/styles.css'
import Link from 'next/link'

export const Footer = () => {
  return (
    <Container className="mx-auto">
      <div className="md:flex justify-between text-sm text-grey-400">
        <div className="flex items-center mb-3 justify-center md:justify-start">
          <Link href="https://about.algodex.com/disclaimers/" target="_blank" rel="noreferrer">
            Disclaimers
          </Link>
          <span className="mx-2">|</span>
          <Link href="https://about.algodex.com/blog/" target="_blank" rel="noreferrer">
            Blog
          </Link>
          <span className="mx-2">|</span>
          <Link href="/docs">Docs</Link>
          <span className="mx-2">|</span>
          <Link href="/support">Support</Link>
        </div>
        <div className="mb-3 text-center">
          © 2021 Algodex, Inc |{' '}
          <span className="text-gray-000">
            <Link href="https://crossfire.network/en/" target="_blank" rel="noreferrer">
              Crossfire.Network, LLC
            </Link>
          </span>
        </div>
      </div>
    </Container>
  )
}
