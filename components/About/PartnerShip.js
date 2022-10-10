/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'

// Custom Styled Components
import { AboutContainer, AboutTitle } from './styles.css'

// const Note = styled.p`
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.palette.gray[100]};
//   line-height: 19px;
//   font-style: italic;
//   a {
//     color: ${({ theme }) => theme.palette.green['400']};
//   }
// `
const Grid = styled.div`
  margin-top: 5rem;
  margin-bottom: 7rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(114px, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  @media (max-width: 501px) {
    grid-template-columns: repeat(auto-fit, minmax(69px, 1fr));
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
  '/partnership/Algorand Foundation.png',
  '/partnership/BlackVentures.png',
  '/partnership/BlackDragon.png',
  '/partnership/BorderlessCapital.png',
  '/partnership/OneBlockLabs.png',
  '/partnership/MEXC.png',
  '/partnership/Elevate.png',
  '/partnership/Chainfir Capital.png',
  '/partnership/NODESEEDS.png',
  '/partnership/FISH-DAO.png',
  '/partnership/VESPERTINE.png',
  '/partnership/GENESIS.png',
  '/partnership/BIG-BRAINS.png',
  '/partnership/SafeLaunch.png',
  '/partnership/croc capital.png',
  '/partnership/AB Ventures.png',
  '/partnership/Altamira.png',
  '/partnership/SRT.png',
  '/partnership/Solar DAO.png',
  '/partnership/Blockchain Invest.png',
  '/partnership/DIB.png',
  '/partnership/Criterion.png',
  '/partnership/CV.png',
  '/partnership/AVG.png',
  '/partnership/GAP.png',
  '/partnership/Cryptocapo.png',
  '/partnership/FLOW.png',
  '/partnership/RTE Ventures.png',
  '/partnership/IN.png',
  '/partnership/O1CAPITAL.png',
  '/partnership/AVERAGEMEN.png',
  '/partnership/MH.png'
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
        <Grid className="w-5/5 2xl:w-3/5 xl:w-4/5 lg:w-5/5 md:w-5/5 mx-auto">
          {ImgLinks.map((link, index) => (
            <PartnerImgWrapper key={index}>
              <PartnerImg src={link} />
            </PartnerImgWrapper>
          ))}
        </Grid>

        {/* <Note className="my-14">
          {t('For more information on joining as a partner, contact us')}{' '}
          <Link href="/about">{t('here')}</Link>
        </Note> */}
      </AboutContainer>
    </PartnerShipSection>
  )
}
