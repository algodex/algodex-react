import {
  ConnectWalletBtn,
  Container,
  IconLogo,
  InlineLogo,
  MobileNavContainer,
  MobileNavigation,
  NavTextLg,
  NavTextSm,
  Navigation,
  NetworkDropdown
} from './header.css'
import { mdiClose, mdiContentCopy, mdiOpenInNew } from '@mdi/js'
import { useEffect, useState } from 'react'

import ActiveLink from 'components/active-link'
import DropdownWrapper from 'components/dropdown'
// import AssetSearch from "../asset-search";
/* eslint-disable */
import Hamburger from 'components/hamburger'
import Icon from '@mdi/react'
import LanguageSelection from 'components/language-selection'
import Link from 'next/link'
// import OfficialAlgorand from '../../assets/Official-Algo-Wallet-icon.svg'
import { ReactSVG } from 'react-svg'
import _ from 'lodash'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'

export const MyAlgo = styled(ReactSVG)`
  height: auto;
  width: 10rem;
  display: block;
`

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [networkUpdate, setNetworkUpdate] = useState(null)
  const [isWalletConnectDropDownVisible, setIsWalletConnectDropDownVisible] = useState(false)
  const setActiveNetwork = useUserStore((state) => state.setActiveNetwork)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  
  
  const { t } = useTranslation('common')

  const handleNetworkChangeFn = (value) => {
    setNetworkUpdate(value)
    // if(activeNetwork !== value){
    //   router.push(window.location.href.replace(activeNetwork, value))
    // }
  }


  useEffect(() => {
    // setNetworkUpdate(activeNetwork)
    setNetworkUpdate(window.location.hostname === 'mainnet' ? 'mainnet' : 'testnet')
  }, [])

  const WalletOptions = () => {
    return <div>
      <p>CONNECT A WALLET</p>
      <div>
        <div>
          <ReactSVG style={{
            height: 'auto',
            width: '10rem'
          }} src="../assets/Official-Algo-Wallet-icon.svg" />
          <p>Algorand Mobile Wallet</p>
        </div>
        <div>
          <MyAlgo src="/My-Algo-Wallet-icon.svg" />
          <p>My Algo Wallet</p>
        </div>
      </div>
    </div>
  }

  const renderActiveWallet = () => {
    return <div>
      <p>ACTIVE WALLET</p>
      <div>
        <div>
          <div>
            <div>
              <p>AH8TJX78TG2P....Q235FRTK90LP</p>
              <Icon
                path={mdiContentCopy}
                title="Copy Address"
                size={0.8}
                className="cursor-pointer"
                color="#FFFFFF"
              />
            </div>
            <div>DISCONNECT</div>
          </div>
          <div>
            <p>View on AlgoExplorer</p>
            <Icon
              path={mdiOpenInNew}
              title="Algo explorer link"
              size={0.8}
              className="cursor-pointer"
              color="#FFFFFF"
            />
          </div>
        </div>
        <div>CONNECT ANOTHER WALLET</div>
      </div>
    </div>
  }

  const renderWalletConnectDropdown = () => {
    return <DropdownWrapper>
      <div className="flex justify-between p-3">
        <p>Your Wallets</p>
        <Icon
          path={mdiClose}
          title="Close Dropdown"
          size={0.8}
          className="cursor-pointer"
          color="#FFFFFF"
        />
      </div>
      {WalletOptions()}
      <div>
        <p>New to Algorand?</p>
        <p>Learn More About Algorand Wallets</p>
      </div>
    </DropdownWrapper>
  }

  useEffect(() => {
    networkUpdate == "mainnet" ? setActiveNetwork("mainnet") : setActiveNetwork("testnet")
  }, [networkUpdate])

  return (
    <Container className="flex" data-testid="header-container">
      <Link href="/trade">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
      &nbsp;
      <NetworkDropdown className="font-medium" activeNetwork={activeNetwork} onChange={(e) => handleNetworkChangeFn(e.target.value)}>
        <option value="mainnet" selected={activeNetwork === "mainnet"}>MAINNET</option>
        <option value="testnet" selected={activeNetwork === "testnet"}>TESTNET</option>
      </NetworkDropdown>
        
      
      <Navigation>
        <ActiveLink href="/about" matches={/^\/about/}>
          <NavTextLg>{t('header-about')}</NavTextLg>
        </ActiveLink>
        {/*<a target="_blank" href="//about.algodex.com" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-about')}</NavTextLg>*/}
        {/*</a>*/}
        <ActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('header-trade')}</NavTextLg>
        </ActiveLink>
        <ActiveLink href="/docs" matches={/^\/docs/}>
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </ActiveLink>
        {/*<a*/}
        {/*  target="_blank"*/}
        {/*  href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"*/}
        {/*  rel="noreferrer"*/}
        {/*>*/}
        {/*  <NavTextLg>{t('header-docs')}</NavTextLg>*/}
        {/*</a>*/}
        <ActiveLink href="/support" matches={/^\/support/}>
          <NavTextLg>{t('header-support')}</NavTextLg>
        </ActiveLink>
        {/*<a target="_blank" href="//about.algodex.com/support/" rel="noreferrer">*/}
        {/*  <NavTextLg>{t('header-support')}</NavTextLg>*/}
        {/*</a>*/}
        {/*
        <ActiveLink href="/wallet">
          <NavTextLg>Wallet</NavTextLg>
        </ActiveLink>
        <ActiveLink href="/support">
          <NavTextLg>Support</NavTextLg>
        </ActiveLink>
        */}
        {/* <NavIcon color="gray.500">
          <Bell />
        </NavIcon>
        <NavIcon color="gray.500">
          <User />
        </NavIcon>
        <NavTextLg onClick={async () => await setLanguage("en")}>
        </NavIcon> */}
        <div>
          <ConnectWalletBtn onClick={() => setIsWalletConnectDropDownVisible(!isWalletConnectDropDownVisible)}>CONNECT A WALLET</ConnectWalletBtn>
          {isWalletConnectDropDownVisible && renderWalletConnectDropdown()}
        </div>
        
        <LanguageSelection isMobile={false} />
        <LanguageSelection isMobile={true} /> &nbsp;&nbsp;&nbsp;
        <Hamburger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Navigation>
      <MobileNavigation isOpen={isOpen}>
        <MobileNavContainer>
          <ActiveLink href="/trade" matches={/^\/trade/}>
            <NavTextSm>Trade</NavTextSm>
          </ActiveLink>
          <a
            target="_blank"
            href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"
            rel="noreferrer"
          >
            <NavTextSm>Docs</NavTextSm>
          </a>
          <a target="_blank" href="//about.algodex.com/support/" rel="noreferrer">
            <NavTextSm>Support</NavTextSm>
          </a>
          {/*
          <ActiveLink href="/wallet">
            <NavTextSm>Wallet</NavTextSm>
          </ActiveLink>
          <ActiveLink href="/support">
            <NavTextSm>Support</NavTextSm>
          </ActiveLink>
          */}
        </MobileNavContainer>
      </MobileNavigation>
    </Container>
  )
}
