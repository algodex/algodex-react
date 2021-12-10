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

  const { t } = useTranslation('common')

  return (
    <Container data-testid="header-container">
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
