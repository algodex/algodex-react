import React from 'react'
import { Container } from 'components/about-assets/styles.css'

export const Footer = () => {
  return (
    <Container className="mx-auto">
      <div className="md:flex justify-between text-sm text-grey-400">
        <div className="flex items-center mb-3 justify-center md:justify-start">
          <a href="#">Disclaimers </a>
          <span className="mx-2">|</span>
          <a href="#">Blog</a>
          <span className="mx-2">|</span>
          <a href="#">Docs</a>
          <span className="mx-2">|</span>
          <a href="#">Support</a>
        </div>
        <div className="mb-3 text-center">
          © 2021 Algodex, Inc |{' '}
          <a href="https://crossfire.network/en/" target="_blank" className="text-gray-000">
            Crossfire.Network, LLC
          </a>
        </div>
      </div>
    </Container>
  )
}
