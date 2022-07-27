import React, { useState } from 'react'
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
const TabWrapper = styled.section`
  display: flex;
  margin-block: 5rem;
  overflow: hidden;
  @media (max-width: 992px) {
    flex-direction: column-reverse;
  }
`
const TabPanel = styled.div`
  flex: 1;
  border-bottom: 2px solid ${({ theme }) => theme.palette.white};
  padding-bottom: 2rem;
  @media (min-width: 1000px) and (max-width: 1298px) {
    padding-right: 2rem;
  }
`
const Tabs = styled.div`
  position: relative;
  margin-left: 3rem;
  @media (max-width: 992px) {
    margin-bottom: 1rem;
    margin-left: 0;
  }
`
const Tab = styled.p`
  font-weight: 700;
  font-size: 1.1rem;
  transition: ease all 0.3s;
  color: ${({ theme }) => theme.palette.white};
  cursor: pointer;
  margin-bottom: 2rem;
  &.active {
    font-size: 1.8rem;
    ::after {
      position: absolute;
      content: '';
      border-left: 2px solid ${({ theme }) => theme.palette.white};
      border-top: 2px solid ${({ theme }) => theme.palette.white};
      height: 100%;
      width: 2rem;
      left: -3rem;
      margin-top: 1rem;
    }
  }
  @media (max-width: 992px) {
    font-size: 1rem;
    &.active {
      font-size: 1.5rem;
      ::after {
        display: none;
      }
    }
  }
`

const SRImgs = [
  '/partnership/Algorand.png',
  '/partnership/BlackVentures.png',
  '/partnership/BlackDragon.png',
  '/partnership/BorderlessCapital.png',
  '/partnership/OneBlockLabs.png',
  '/partnership/MEXC.png',
  '/partnership/Elevate.png',
  '/partnership/Chainfir Capital.png'
]
const SARImgs = [
  '/partnership/NODESEEDS.png',
  '/partnership/FISH-DAO.png',
  '/partnership/VESPERTINE.png',
  '/partnership/GENESIS.png',
  '/partnership/BIG-BRAINS.png',
  '/partnership/SafeLaunch.png'
]
const SBRImgs = [
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

const TabImgs = [SRImgs, SARImgs, SBRImgs]

const TabHeaders = [
  {
    id: 0,
    value: 'SEED ROUND'
  },
  {
    id: 1,
    value: 'SERIES A ROUND'
  },
  {
    id: 2,
    value: 'SERIES B ROUND'
  }
]

export const PartnerShip = () => {
  const { t } = useTranslation('about')
  const [activeTab, setActiveTab] = useState(0)
  const [ImgLinks, setImgLinks] = useState(TabImgs[0])

  const changeTab = (value) => {
    setActiveTab(value)
    setImgLinks(TabImgs[value])
  }

  return (
    <PartnerShipSection>
      <AboutContainer>
        <div className="w-4/5 lg:w-2/6 md:w-1/2 sm:w-3/5 mb-9">
          <AboutTitle>{t('PARTNERSHIPS')}</AboutTitle>
          <hr />
        </div>
        <TabWrapper>
          <TabPanel>
            <Grid className="w-5/5 2xl:w-3/5 xl:w-4/5 lg:w-5/5 md:w-5/5 mx-auto">
              {ImgLinks.map((link, index) => (
                <PartnerImgWrapper key={index}>
                  <PartnerImg src={link} />
                </PartnerImgWrapper>
              ))}
            </Grid>
          </TabPanel>
          <Tabs>
            {TabHeaders.map(({ id, value }) => (
              <Tab
                key={id}
                className={activeTab == id && 'active'}
                onClick={() => {
                  changeTab(id)
                }}
              >
                {value}
              </Tab>
            ))}
          </Tabs>
        </TabWrapper>

        {/* <Note className="my-14">
          {t('For more information on joining as a partner, contact us')}{' '}
          <Link href="/about">{t('here')}</Link>
        </Note> */}
      </AboutContainer>
    </PartnerShipSection>
  )
}
