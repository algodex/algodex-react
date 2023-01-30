/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { AboutContainer, AboutTitle } from './styles.css'

import Button from 'components/Button'
import Image from 'next/image'
import Link from 'next/link'
/* eslint-disable max-len */
import React from 'react'
import { ReactSVG } from 'react-svg'
import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

const HeroSection = styled.div`
  min-height: calc(100vh - 80px);
  background: url('/beautiful-milky.jpg') no-repeat;
  position: relative;
  background-size: cover;
  overflow: hidden;
  padding-block: 6.5rem 4rem;
`

const LaunchBtn = styled(Button)`
  color: ${({ theme }) => theme.palette.gray[100]};
  border: solid 1px;
  border-color: ${({ theme }) => theme.palette.gray[100]};
  text-transform: uppercase;
  background-color: transparent;
  font-size: 1.1rem;
  font-weight: 500;
  height: 2.5rem;
  min-width: 12rem;
`

const InlineLogo = styled(ReactSVG)`
  height: auto;
  width: 19rem;
`

const ImageSection = styled.div`
  @media (max-width: 1030px) {
    width: 609px;
    max-width: 100%;
  }
`

// const Note = styled.p`
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.palette.gray[100]};
//   line-height: 19px;
//   a {
//     color: ${({ theme }) => theme.palette.green['400']};
//   }
// `

export const Hero = () => {
  const { t } = useTranslation('about')
  return (
    <HeroSection>
      <AboutContainer className="flex flex-col lg:flex-row">
        <div className="mb-5 lg:mb-0 sm:ml-5 md:ml-7 lg:ml-9">
          <div className="mt-4 mb-3">
            <InlineLogo src="/logo-inline-dark.svg" />
            <AboutTitle className="leading-10">
              {t('A Decentralized')} {t('Exchange')}
            </AboutTitle>
            <Image src="/Powered-by-Algorand.svg" width={150} height={24} />
          </div>
          <div className="w-full sm:w-4/5 my-4 mb-3">
            <Typography className="mb-8 leading-6 gray-400" fontWeight="medium" color="gray.400">
              {t(
                'Algodex is a highly decentralized exchange with the order book completely on the Algorand blockchain itself'
              )}
              .
            </Typography>
            <Link href="/trade" shallow={true}>
              <LaunchBtn>{t('launch app')}</LaunchBtn>
            </Link>
            {/* <Note className="mt-5">
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
          </Note> */}
          </div>
        </div>
        <ImageSection>
          <img src="/app-view.svg" width={'100%'} height={'100%'} alt="App Screenshot" />
        </ImageSection>
      </AboutContainer>
    </HeroSection>
  )
}
