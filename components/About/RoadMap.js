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
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'

//Styled components
import { AboutContainer, AboutTitle } from './styles.css'

const RoadMapSection = styled.section`
  background-color: ${({ theme }) => theme.palette.gray[800]};
  overflow: hidden;
  padding-block: 1.5rem;
`

const TimeLine = styled.ul`
  position: relative;
  display: flex;
  margin-top: 10rem;
  margin-bottom: 6rem;
  justify-content: center;
  @media (max-width: 600px) {
    display: block;
    margin-top: 6rem;
  }
  li {
    position: relative;
    z-index: 0;
    width: 350px;
    text-align: center;
    @media (max-width: 600px) {
      text-align: left;
      padding-left: 30px;
    }
    &:before {
      content: '';
      width: 26px;
      height: 26px;
      border: 5px solid;
      border-color: ${({ theme }) => theme.palette.gray[100]};
      background-color: ${({ theme }) => theme.palette.gray[800]};
      border-radius: 50%;
      display: block;
      margin-left: 39.5%;
      @media (max-width: 600px) {
        margin-left: -31px;
        margin-bottom: 1rem;
      }
    }
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      background-color: ${({ theme }) => theme.palette.gray[100]};
      height: 4px;
      top: 11px;
      left: 0;
      z-index: -1;
      @media (max-width: 600px) {
        width: 4px;
        height: 100%;
        left: 10px;
      }
    }
    h2 {
      font-weight: 700;
      font-size: 1.12rem;
      color: ${({ theme }) => theme.palette.gray[100]};
      position: absolute;
      line-height: 23px;
      top: -4rem;
      left: 29%;
      @media (min-width: 1000px) {
        left: 34%;
      }
      @media (min-width: 1300px) {
        left: 37%;
      }
      @media (max-width: 600px) {
        position: relative;
        top: 0;
        left: 0;
        margin-bottom: 1rem;
      }
      & + p {
        position: relative;
        margin-top: 4rem;
        @media (max-width: 600px) {
          margin-top: 0;
        }
        &:after {
          content: '';
          position: absolute;
          border-right: 2px dashed;
          border-color: ${({ theme }) => theme.palette.gray[100]};
          left: 45%;
          height: 3rem;
          bottom: 120%;
          @media (max-width: 600px) {
            height: 0;
            border: none;
            position: relative;
          }
        }
      }
    }
    &:nth-of-type(even) {
      h2 + p {
        margin-top: 8rem;
        @media (max-width: 600px) {
          margin-top: 0;
        }
        &:after {
          height: 7rem;
        }
      }
    }
    &:nth-child(1) {
      h2 {
        @media (min-width: 1000px) {
          left: 30%;
        }
      }
    }
    p {
      font-weight: 500;
      font-size: 0.87rem;
      color: ${({ theme }) => theme.palette.gray[100]};
    }
  }
`

export const RoadMap = () => {
  const { t } = useTranslation('about')
  return (
    <RoadMapSection>
      <AboutContainer>
        <div className="w-4/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mb-9">
          <AboutTitle>{t('ROADMAP')}</AboutTitle>
          <hr />
        </div>
        <TimeLine>
          <li className="mb-5">
            <h2>
              February
              <br /> 2022
            </h2>
            <p className="mb-3">{t('Algodex Mainnet Launch')}</p>
          </li>
          <li className="mb-5">
            <h2>
              March
              <br /> 2022
            </h2>
            <p className="mb-3">{t('Algodex Token (ALGX) Public Sale A')}</p>
            <p className="mb-3">{t('Launch of Algodex Mailbox Application')}</p>
          </li>
          <li className="mb-5">
            <h2>
              Q2
              <br /> 2022
            </h2>
            <p className="mb-3">{t('Launch of trading SDK for Algodex')}</p>
            <p className="mb-3">{t('Launch of Algodex as a downloadable desktop application')}</p>
            <p className="mb-3">{t('Algodex Token (ALGX) token generation event')}</p>
          </li>
          <li className="mb-5">
            <h2>
              Q3
              <br /> 2022
            </h2>
            <p className="mb-3">{t('Algodex rewards and fee system')}</p>
            <p className="mb-3">{t('Launch of trading bot for Algodex')}</p>
          </li>
          <li className="mb-5">
            <h2>
              Q4
              <br /> 2022
            </h2>
            <p className="mb-3">{t('Launch of Algodex NFT marketplace')}</p>
          </li>
        </TimeLine>
      </AboutContainer>
    </RoadMapSection>
  )
}
