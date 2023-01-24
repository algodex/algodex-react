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

// Custom Styled Components
import { AboutContainer } from './styles.css'
import React from 'react'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

const FeatureSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[700]};
  overflow: hidden;
  p {
    line-height: 25px;
  }
`

const DarkContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[650]};
  padding-block: 70px;
  h6 {
    font-weight: 700;
    color: ${({ theme }) => theme.palette.gray[300]};
    font-size: 14px;
    margin: 0;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 12px;
    line-height: 1;
    color: ${({ theme }) => theme.palette.gray[100]};
  }
  a {
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.green[500]};
  }
  p {
    color: ${({ theme }) => theme.palette.white};
    font-weight: 500;
  }
  .border {
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.white};
  }
  .note {
    margin-top: 20px;
    padding: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 640px;
    max-width: 95%;
    margin-inline: auto;
    text-align: center;
    color: ${({ theme }) => theme.palette.white};
  }
`

const LightContainer = styled.div`
  color: ${({ theme }) => theme.palette.gray[100]};
  padding-block: 70px;
  background-color: ${({ theme }) => theme.palette.gray[500]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px -4px 4px rgba(0, 0, 0, 0.25);
  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 12px;
    line-height: 1;
    color: ${({ theme }) => theme.palette.gray[100]};
  }
  a {
    color: ${({ theme }) => theme.palette.gray[100]};
  }
  img{
    height:350px;
  }
  p{
    font-weight:500;
    font-size:17px;
  }
  i{
    font-size:14px;
  }
`

export const Features = () => {
  const { t } = useTranslation('about')

  return (
    <FeatureSection>
      <DarkContainer>
        <AboutContainer>
          <div className="lg:flex">
            <div className={'lg:w-1/2 ml-0 mb-5 lg:my-auto border p-5 lg:border-r-0 lg:pr-[10%]'}>
              <h6>{t('Get away from liquidity pools')}</h6>
              <h2>{t('Set the price you want to sell or buy at')}</h2>
              <p className="mb-4">
                {t(
                  'Algodex supports limit orders so you can be assured your trade will only occur at the price you set unlike pools where you have to deal with slippage and have no control over the price at that moment'
                )}
                .
              </p>

              <Link href="/trade" shallow={true}>
                {t('Start trading >')}
              </Link>
            </div>
            <div className="lg:w-1/2 ml-auto order-last">
              <img src={'/feature-1.svg'} alt="Feature Mockup" className="w-full object-contain" />
            </div>
          </div>
        </AboutContainer>
      </DarkContainer>
      <LightContainer>
        <AboutContainer className="lg:flex">
          <div className="lg:w-1/3">
            <img src={'/feature-2.svg'} alt="Feature Mockup" className="w-full object-contain" />
          </div>
          <div className="lg:w-2/3 ml-0 mb-5 lg:my-auto text-center">
            <h2>{t('Trade ANY Algorand Standard Asset')}</h2>
            <p className="mb-4">
              {t(
                'All assets on the Algorand blockchain are supported in Algodex by default. If it exists, you can trade it'
              )}
              .
              <br />
              <br />
              <b>{t('Yes - even NFTs')}.</b>
              <br />
              <i>*NFT specific UI coming soon</i>
            </p>
            <hr />
            <p>
              {t(
                'NOTE: Users in the USA and Canada are currently restricted from trading some Mainnet assets'
              )}
              .
              <br />
              <br />
              {t('Projects can apply with this form')}{' '}
              <a
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdJ7s73pweD83A9FP9X3zxelj4WN7jUvjNzuSCDL7wpfTmElQ/viewform" rel="noreferrer"
              >
                {t('this form')}
              </a>{' '}
              {t(
                'to be listed for North American trading. The rest of the world can trade all ASAs with no restrictions'
              )}
              .
            </p>
          </div>
          <div className="lg:w-1/3">
            <img src={'/feature-3.svg'} alt="Feature Mockup" className="w-full object-contain" />
          </div>
        </AboutContainer>
      </LightContainer>
      <DarkContainer>
        <AboutContainer>
          <div className="lg:flex">
            <div className={'lg:w-1/2 ml-0 mb-5 lg:my-auto border p-5 lg:border-l-0 lg:pl-[10%]'}>
              <h6>{t('Provide liquidity and')}</h6>
              <h2>{t('Earn rewards from trading')}</h2>
              <p className="mb-4">
                {t('Earn ALGX rewards by placing orders on Algodex and being a market maker')}
                .
                <br />
                <br />
                {t(
                  'Learn about how rewards are calculated and view accumulated rewards with the Algodex Rewards App'
                )}
                .
              </p>

              <a href="https://tradingbot.algodex.com" target="_blank" rel="noreferrer">
                {t('Go to Rewards App >')}
              </a>
            </div>
            <div className="lg:w-1/2 ml-auto order-first">
              <img src={'/feature-4.svg'} alt="Feature Mockup" className="w-full object-contain" />
            </div>
          </div>
          <div className="note">
            {t(
              'ALGODEX Bots will be launching soon to allow you to set parameters for a market making bot to automatically place orders around a set spread percentage and earn rewards'
            )}
            .
          </div>
        </AboutContainer>
      </DarkContainer>

     
    
    </FeatureSection>
  )
}
