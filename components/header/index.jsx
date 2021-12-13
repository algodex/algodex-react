import {
  Container,
  Flag,
  IconLogo,
  InlineLogo,
  LanguageDropDown,
  LanguageItem,
  LanguagesContainer,
  MobileNavContainer,
  MobileNavigation,
  NavTextLg,
  NavTextSm,
  Navigation
} from './header.css'

import ActiveLink from 'components/active-link'
// import AssetSearch from "../asset-search";
/* eslint-disable */
import Hamburger from 'components/hamburger'
import Link from 'next/link'
import i18n from '../../i18n.json'
import theme from '../../theme'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

// Map locale code to the flag used in 'react-country-flag'
const localeToFlags = {
  en: 'US',
  es: 'MX',
  nl: 'NL',
  ch: 'CN',
  tr: 'TR',
  vn: 'VN',
  id: 'ID',
  iq: 'IQ',
  my: 'MY',
  ir: 'IR',
  it: 'IT',
  se: 'SE',
  hu: 'HU',
  no: 'NO',
  ct: 'ES',
  th: 'TH',
  in: 'IN',
  de: 'DE',
  kr: 'KR',
  fr: 'FR',
  pl: 'PL'
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { asPath, locale } = useRouter()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const { t } = useTranslation('common')

  const renderLanguageMobile = () => {
    console.log('show language selection')
    const res = i18n.locales.filter((localeCd) => localeCd !== locale)
    return res.map(localeCd => {
      // return <div style={{marginBottom: '0.4rem'}}>
      //   {localeCd.toUpperCase()} <Flag countryCode={localeToFlags[localeCd]} svg />
      // </div>
      return <Link href={asPath} locale={localeCd}>
        <a href="#">
          <NavTextSm style={{marginBottom: '0.4rem'}}>
            {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
          </NavTextSm>
        </a>
      </Link>
    })
  }

  return (
    <Container className="flex" data-testid="header-container">
      <Link href="/">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
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

        <LanguagesContainer>
          <Link href={asPath} locale={locale}>
            <a href="#">
              <NavTextLg>
                {locale} <Flag countryCode={localeToFlags[locale]} svg />
              </NavTextLg>
            </a>
          </Link>

          <LanguageDropDown>
            <LanguageItem key={locale}>
              <Link href={asPath} locale={locale}>
                <a href="#">
                  <NavTextLg>
                    {locale} <Flag countryCode={localeToFlags[locale]} svg />
                  </NavTextLg>
                </a>
              </Link>
            </LanguageItem>
            {i18n.locales
              .filter((localeCd) => localeCd !== locale)
              .map((localeCd) => (
                <LanguageItem key={localeCd}>
                  <Link href={asPath} locale={localeCd}>
                    <a href="#">
                      <NavTextLg>
                        {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
                      </NavTextLg>
                    </a>
                  </Link>
                </LanguageItem>
              ))}
          </LanguageDropDown>
        </LanguagesContainer>
        <div 
          style={{
            background: theme.colors.gray['700'],
            padding: '0.3rem 0.6rem',
            borderRadius: '3px',
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'flex-start',
            // height: '35vh',
            // overflowX: 'scroll'
          }}
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        >
          <NavTextSm>
            {/* EN<Flag countryCode="US" svg /> */}
            {locale} <Flag countryCode={localeToFlags[locale]} svg />
          </NavTextSm>
        </div> &nbsp;&nbsp;&nbsp;
        {isLanguageOpen && <div
          style={{
            position: 'absolute',
            top: '45px',
            right: '54px',
            zIndex: '40',
            background: theme.colors.gray['700'],
            padding: '0.3rem 0.5rem',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '35vh',
            overflowX: 'scroll'
          }}
        >
          {renderLanguageMobile()}
        </div>}
        
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
          <NavTextSm>
            EN <Flag countryCode="US" svg />
          </NavTextSm>
        </MobileNavContainer>
      </MobileNavigation>
    </Container>
  )
}
