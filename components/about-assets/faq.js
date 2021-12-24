import React from 'react'
import { HowItWorksWrapper, Container } from './styles.css'

export const AboutFAQ = () => {
  return (
    <HowItWorksWrapper>
      <Container className="container mx-auto">
        <div>
          <h4 className="text-lg">Frequently Asked Questions (FAQ)</h4>
        </div>
      </Container>
      <hr className="my-8" />
      <Container className="container mx-auto">
        <div className="my-14 md:flex">
          <div className="lg:w-1/2 md:w-3/5 md:text-left xs:text-center mb-7 mr-6">
            <h2 className="text-lg mb-9">Donations / Tips</h2>
            <p className="italic text-sm font-weight-light text-gray-800/60">
              Algodex is completely bootstrapped and could use your help. If you’d like to donate or
              send a tip to help the project, please click on the button to view our ALGO address.
              We welcome any and all amounts – thank you for your generosity!
            </p>
          </div>
          <div className="my-auto lg:w-1/2 md:w-2/5 text-center mb-7">
            <button className="btn-outline">View ALGO Address / QR</button>
          </div>
        </div>
      </Container>
    </HowItWorksWrapper>
  )
}
