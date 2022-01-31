import React, { useState, useEffect } from 'react'
import { BannerWrapper } from './styles.css'
import Link from 'next/link'
<<<<<<< HEAD:components/about-assets/banner.js
import { Container } from 'components/about-assets/styles.css'
import useAxios from 'axios-hooks'
=======
import { Container } from 'components/About/styles.css'
>>>>>>> next:components/Pages/About/banner.js

export const AboutBanner = () => {
  const [email, setEmail] = useState('')
  const [pageUri, setPageUri] = useState('')

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: '/api/subscribe',
      method: 'POST',
      data: { email, pageUri }
    },
    {
      manual: true
    }
  )

  useEffect(() => {
    if (data?.success === true && !loading) {
      setEmail('')
    }
  }, [data?.success, loading])

  useEffect(() => {
    setPageUri(window.location.href)
  })
  return (
    <BannerWrapper>
      <Container className="container mx-auto">
        <div className="lg:w-1/2 md:w-4/5 sm:w-full">
          <h2 className="mb-7">
            DECENTRALIZED <br /> <span className="text-green-500">MARKETPLACE</span>
          </h2>
          <p className="mb-7 tagline">
            Learn how Algodex works and find opportunities to contribute to the project. Stay
            up-to-date by entering your email below!
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => refetch()} disabled={loading}>
            Subscribe
          </button>
          <div>
            <p className="text-green-500 text-2xl italic my-9">
              NEW: You can now try out the platform on Testnet by going to{' '}
              <Link href="/trade" target="_blank" rel="noreferrer">
                <strong className="cursor-pointer underline">testnet.algodex.com</strong>
              </Link>
            </p>
            <hr className="mt-14" />
            <img
              src="/Powered-by-Algorand.png"
              alt="Powered by Algorand"
              className="w-2/5 md:w-1/2 sm:w-3/5 xs:w-3/5  mt-4 mb-9"
            />
          </div>
        </div>
      </Container>
    </BannerWrapper>
  )
}
