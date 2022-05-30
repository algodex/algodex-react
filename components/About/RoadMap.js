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
      top: -4rem;
      left: 29%;
      line-height: 23px;
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
            <p className="mb-3">Algodex Mainnet Launch</p>
          </li>
          <li className="mb-5">
            <h2>
              March
              <br /> 2022
            </h2>
            <p className="mb-3">Algodex Token (ALGX) token generation event</p>
            <p className="mb-3">Algodex Token (ALGX) Public Sale A</p>
            <p className="mb-3">Launch of Algodex Mailbox Application</p>
          </li>
          <li className="mb-5">
            <h2>
              Q2
              <br /> 2022
            </h2>
            <p className="mb-3">Launch of trading SDK for Algodex</p>
            <p className="mb-3">Launch of Algodex as a downloadable desktop application</p>
          </li>
          <li className="mb-5">
            <h2>
              Q3
              <br /> 2022
            </h2>
            <p className="mb-3">Algodex rewards and fee system</p>
            <p className="mb-3">Launch of trading bot for Algodex</p>
          </li>
          <li className="mb-5">
            <h2>
              Q4
              <br /> 2022
            </h2>
            <p className="mb-3">Algodex rewards and fee system</p>
            <p className="mb-3">Launch of Algodex NFT marketplace</p>
          </li>
        </TimeLine>
      </AboutContainer>
    </RoadMapSection>
  )
}
