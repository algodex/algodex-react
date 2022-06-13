/* eslint-disable max-len */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'
import { ReactSVG } from 'react-svg'
import Button from 'components/Button'
import { AboutContainer, AboutTitle } from './styles.css'

const HeroSection = styled.div`
  min-height: calc(100vh - 80px);
  background: url('/beautiful-milky.png') no-repeat;
  position: relative;
  background-size: cover;
  overflow: hidden;
  padding-block: 4rem;
`

const LaunchBtn = styled(Button)`
  color: ${({ theme }) => theme.palette.gray[100]};
  border: solid 1px;
  border-color: ${({ theme }) => theme.palette.gray[100]};
  text-transform: uppercase;
  background-color: transparent;
  font-size: 1.1rem;
  font-weight: 500;
`

const InlineLogo = styled(ReactSVG)`
  height: auto;
  width: 19rem;
`

const Note = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.gray[100]};
  line-height: 19px;
  a {
    color: ${({ theme }) => theme.palette.green['400']};
  }
`

export const Hero = () => {
  const { t } = useTranslation('about')
  return (
    <HeroSection>
      <AboutContainer>
        <div className="w-5/5 lg:w-2/5 md:w-1/2 sm:w-3/5 mt-4 mb-3 ml-5">
          <InlineLogo src="/logo-inline-dark.svg" />
          <AboutTitle>
            {t('A Decentralized')} <br /> {t('Marketplace')}
          </AboutTitle>
          <Image src="/Powered-by-Algorand.svg" width={150} height={24} />
        </div>
        <div className="w-5/5 lg:w-1/2 md:w-4/5 sm:w-5/5">
          <hr />
        </div>
        <div className="w-5/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mt-4 mb-3 ml-5">
          <p className="mb-6 leading-6">
            {t(
              'Algodex is a highly decentralized marketplace with the orderbook completely on the Algorand blockchain itself'
            )}
            .
          </p>
          <Link href="/trade">
            <LaunchBtn>{t('launch app')}</LaunchBtn>
          </Link>
          <Note className="mt-5">
            Projects can apply with{' '}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdJ7s73pweD83A9FP9X3zxelj4WN7jUvjNzuSCDL7wpfTmElQ/viewform"
              target={'_blank'}
              rel="noreferrer"
            >
              this form
            </a>{' '}
            to be listed for North American trading. The rest of the world can trade all ASAs with
            no restrictions.
            <br />
            <br />
            Testnet is also available for anyone trying out the platform risk free at :{' '}
            <Link href="https://testnet.algodex.com">testnet.algodex.com</Link>
          </Note>
        </div>
      </AboutContainer>
    </HeroSection>
  )
}
