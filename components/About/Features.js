import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'

// Custom Styled Components
import { AboutContainer } from './styles.css'

const SubTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.gray[100]};
`
const Number = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.gray[100]};
`
const FeatureSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[700]};
  overflow: hidden;
  p {
    line-height: 25px;
  }
`

export const Features = () => {
  const { t } = useTranslation('about')
  // eslint-disable-next-line react/prop-types
  const Layout = ({ number, title, sub, imgLink, imgPosition }) => {
    return (
      <div className="py-12 lg:flex">
        <div
          className={`my-auto ${
            imgPosition == 'last' ? 'lg:w-2/5 ml-0' : 'lg:w-1/2 ml-auto order-last'
          }`}
        >
          <Number className="mb-4">{number}.</Number>
          <SubTitle className="mb-9">{t(title)}</SubTitle>
          <p className="mb-4">{t(sub)}.</p>
        </div>
        <div
          className={`${
            imgPosition == 'last' ? 'lg:w-1/2 ml-auto' : 'lg:w-2/5 ml-0'
          } order-${imgPosition}`}
        >
          <img src={imgLink} alt="Feature Mockup" className="w-full object-contain" />
        </div>
      </div>
    )
  }
  return (
    <FeatureSection>
      <AboutContainer>
        <Layout
          number={'01'}
          title={'Make market and limit orders'}
          sub={
            'Algodex supports limit orders so you can rest assured your trade will only occur at the price you set'
          }
          imgLink={'/Exchange-Mockup.png'}
          imgPosition={'last'}
        />
        <Layout
          number={'02'}
          title={'Trade all Algorand Standard Assets (ASAs)'}
          sub={
            'All assets on the Algorand blockchain are supported in Algodex by default. If it exists, you can trade it. Yes - even NFTs'
          }
          imgLink={'/Exchange-Mockup.png'}
          imgPosition={'first'}
        />
        <Layout
          number={'03'}
          title={'NFT Trading'}
          sub={
            'Purchase and trade Non-Fungible Tokens (NFTs) directly within Algodex. View and place bids on NFTs even if they’re not currently listed for sale anywhere'
          }
          imgLink={'/Exchange-Mockup.png'}
          imgPosition={'last'}
        />
        <Layout
          number={'04'}
          title={'Staking Rewards'}
          sub={
            'Coming Soon - Every token will have staking pools with the option to stake for ALGX, ALGO, and/or the staked token. Stay tuned for more information'
          }
          imgLink={'/Exchange-Mockup.png'}
          imgPosition={'first'}
        />
      </AboutContainer>
    </FeatureSection>
  )
}
