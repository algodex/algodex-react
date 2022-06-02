import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'
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
  grid-template-columns: repeat(auto-fit, minmax(114px, 1fr));
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  margin-block: 5rem;
  @media (max-width: 501px) {
    grid-template-columns: repeat(auto-fit, minmax(69px, 1fr));
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
  }
`
const PartnerImgWrapper = styled.div`
  width: 114px;
  height: 114px;
  border-radius: 3px;
  @media (max-width: 501px) {
    width: 69px;
    height: 69px;
  }
`
const PartnerImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`
const PartnerShipSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[700]};
  overflow: hidden;
  padding-top: 1.5rem;
`

const ImgLinks = [
  '/partnership/NODESEEDS.png',
  '/partnership/FISH-DAO.png',
  '/partnership/VESPERTINE.png',
  '/partnership/GENESIS.png',
  '/partnership/BIG-BRAINS.png',
  '/partnership/DIB.png',
  '/partnership/Criterion.png',
  '/partnership/CV.png',
  '/partnership/AVG.png',
  '/partnership/GAP.png',
  '/partnership/FLOW.png',
  '/partnership/SRT.png',
  '/partnership/IN.png',
  '/partnership/O1CAPITAL.png',
  '/partnership/AVERAGEMEN.png'
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
            <PartnerImgWrapper key={index}>
              <PartnerImg src={link} />
            </PartnerImgWrapper>
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
