import React from 'react'
import { HowItWorksWrapper, Container } from './styles.css'

export const AboutHowItWorks = () => {
  return (
    <HowItWorksWrapper>
      <Container className="container mx-auto">
        <div className="my-14 lg:flex">
          <div className="lg:w-1/2">
            <h2>How does it work?</h2>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/Exchange-Mockup.png"
              alt="Exchange Mockup"
              className="w-full object-contain mockup-img"
            />
            <p className="my-6 text-base text-gray-800/80">
              Algodex is a highly decentralized marketplace with the orderbook completely on the
              Algorand blockchain itself.
            </p>
          </div>
        </div>
      </Container>
      <hr className="my-8" />
      <Container className="container mx-auto">
        <div className="my-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            <div>
              <h5 className="text-red-500 mb-5">01.</h5>
              <h3 className="text-xl text-gray-800 font-weight-bold mb-5">
                Make market and limit orders
              </h3>
              <p className="text-base text-gray-800/80">
                Algodex supports limit orders so you can rest assured your trade will only occur at
                the price you set.
              </p>
            </div>
            <div>
              <h5 className="text-red-500 mb-5">02.</h5>
              <h3 className="text-xl text-gray-800 font-weight-bold mb-5">
                Trade all Algorand Standard Assets (ASAs)
              </h3>
              <p className="text-base text-gray-800/80">
                All assets on the Algorand blockchain are supported in Algodex by default. If it
                exists, you can trade it.
              </p>
            </div>
            <div>
              <h5 className="text-red-500 mb-5">03.</h5>
              <h3 className="text-xl text-gray-800 font-weight-bold mb-5">
                NFT marketplace (coming in future release)
              </h3>
              <p className="text-base text-gray-800/80">
                Purchase and trade Non-Fungible Tokens (NFTs) directly within Algodex (this feature
                coming soon).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </HowItWorksWrapper>
  )
}
