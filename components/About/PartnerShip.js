import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { AboutContainer, AboutTitle } from './styles.css'

// Custom Styled Components

const Note = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.gray[100]};
  line-height: 19px;
  font-style: italic;
  a {
    color: ${({ theme }) => theme.palette.green['400']};
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  @media (max-width: 501px) {
    grid-template-columns: repeat(auto-fit, minmax(61px, 1fr));
  }
  grid-row-gap: 2rem;
  grid-column-gap: 40px;
  margin-block: 5rem;
`
const PartnerImg = styled.div`
  background-color: ${({ theme }) => theme.palette.green['400']};
  width: 96px;
  height: 96px;
  border-radius: 6px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`
const PartnerShipSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[700]};
  overflow: hidden;
  padding-top: 1.5rem;
`

const ImgLinks = [
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg',
  '/Powered-by-Algorand.svg'
]

export const PartnerShip = () => {
  const { t } = useTranslation('about')
  return (
    <PartnerShipSection>
      <AboutContainer>
        <div className="w-4/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mb-9">
          <AboutTitle>{t('PARTNERSHIPS')}</AboutTitle>
          <hr />
        </div>
        <Grid className="w-5/5 lg:w-4/5 md:w-4/5 mx-auto">
          {ImgLinks.map((link, index) => (
            <PartnerImg key={index}>
              <Image src={link} width={96} height={96} />
            </PartnerImg>
          ))}
        </Grid>
        <Note className="my-14">
          {t('For more information on joining as a partner, contact us')}{' '}
          <Link href="/about">{t('here')}</Link>
        </Note>
      </AboutContainer>
    </PartnerShipSection>
  )
}
