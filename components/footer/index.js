import React from 'react'
import { Container } from 'components/about-assets/styles.css'

export const Footer = () => {
  return (
    <Container className="mx-auto">
      <div className="md:flex justify-between text-sm text-grey-400">
        <div className="flex items-center mb-3 justify-center md:justify-start">
          <a href="https://about.algodex.com/disclaimers/" target="_blank" rel="noreferrer">
            Disclaimers{' '}
          </a>
          <span className="mx-2">|</span>
          <a href="https://about.algodex.com/blog/" target="_blank" rel="noreferrer">
            Blog
          </a>
          <span className="mx-2">|</span>
          <a href="/docs" target="_blank" rel="noreferrer">
            Docs
          </a>
          <span className="mx-2">|</span>
          <a href="/support" target="_blank" rel="noreferrer">
            Support
          </a>
        </div>
        <div className="mb-3 text-center">
          © 2021 Algodex, Inc |{' '}
          <a
            href="https://crossfire.network/en/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-000"
          >
            Crossfire.Network, LLC
          </a>
        </div>
      </div>
    </Container>
  )
}
