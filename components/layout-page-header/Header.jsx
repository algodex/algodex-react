import Hamburger from 'components/hamburger'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ActiveLink from 'components/active-link'
import { useTranslation } from 'next-export-i18n'
import { useRouter } from 'next/router'
import i18n from '../../i18n.json'

import {
  Container,
  IconLogo,
  InlineLogo,
  Navigation,
  NavTextLg,
  NavTextSm,
  Flag,
  MobileNavigation,
  MobileNavContainer,
  LanguagesContainer,
  LanguageItem,
  LanguageDropDown
} from './header.css'
import { useEventDispatch } from '../../events'

// Map locale code to the flag used in 'react-country-flag'
const localeToFlags = {
  en: 'US',
  es: 'ES',
  nl: 'NL',
  ch: 'CN',
  tr: 'TR',
  vn: 'VN',
  se: 'SE',
  hu: 'HU'
}

export default function Header() {
  const [language, setLanguage] = useState('en')
  const [isOpen, setIsOpen] = useState(false)
  const { asPath, locale } = useRouter()
  const { t } = useTranslation('common')
  const dispatcher = useEventDispatch()
  useEffect(() => {
    console.log('Dispatch: loaded')
    dispatcher('loaded', 'header')
  }, [dispatcher])
  useEffect(() => {
    setLanguage(locale ? locale : navigator.language.split('-')[0])
  }, [locale])

  return (
    <Container data-testid="header-container">
      <Link href="/">
        <a>
          <InlineLogo src="/logo-inline-dark.svg" />
          <IconLogo src="/logo-icon-dark.svg" />
        </a>
      </Link>
      <Navigation>
        {/* eslint-disable-next-line */}
        <a target="_blank" href="//about.algodex.com" rel="noreferrer">
          <NavTextLg>{t('common')['header-about']}</NavTextLg>
        </a>
        <ActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('common')['header-trade']}</NavTextLg>
        </ActiveLink>
        {/* eslint-disable-next-line */}
        <a
          target="_blank"
          href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"
          rel="noreferrer"
        >
          <NavTextLg>{t('common')['header-docs']}</NavTextLg>
        </a>
        {/* eslint-disable-next-line */}
        <a target="_blank" href="//about.algodex.com/support/" rel="noreferrer">
          <NavTextLg>{t('common')['header-support']}</NavTextLg>
        </a>
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
          <Link href={asPath} locale={language}>
            <a href="# ">
              <NavTextLg>
                {language} <Flag countryCode={localeToFlags[language]} svg />
              </NavTextLg>
            </a>
          </Link>

          <LanguageDropDown>
            <LanguageItem key={language}>
              <Link href={asPath} locale={language}>
                <a href="#/">
                  <NavTextLg>
                    {language} <Flag countryCode={localeToFlags[language]} svg />
                  </NavTextLg>
                </a>
              </Link>
            </LanguageItem>
            {i18n.locales
              .filter((localeCd) => localeCd !== language)
              .map((localeCd) => (
                <LanguageItem key={localeCd}>
                  <Link href={asPath} locale={localeCd}>
                    <a href="#/">
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
