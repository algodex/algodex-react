import React from 'react'
import { BannerWrapper } from './styles.css'

export const AboutBanner = () => {
  return (
    <BannerWrapper className="lg:w-1/2 md:w-4/5 sm:w-full">
      <h2 className="mb-7">
        DECENTRALIZED <br /> <span className="text-green-500">MARKETPLACE</span>
      </h2>
      <p className="mb-7 tagline">
        Learn how Algodex works and find opportunities to contribute to the project. Stay up-to-date
        by entering your email below!
      </p>
      <input type="email" placeholder="Email" />
      <button>Subscribe</button>
      <div>
        <p className="text-green-500 text-2xl italic my-9">
          NEW: You can now try out the platform on Testnet by going to{' '}
          <a
            href="https://testnet.algodex.com"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            <strong>testnet.algodex.com</strong>
          </a>
        </p>
        <hr className="mt-14" />
        <img
          src="/Powered-by-Algorand.png"
          alt="Powered by Algorand"
          className="w-2/5 md:w-1/2 sm:w-3/5 xs:w-3/5  mt-4 mb-9"
        />
      </div>
    </BannerWrapper>
  )
}
