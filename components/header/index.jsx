import Hamburger from 'components/hamburger'
import Link from 'next/link'
import { useState } from 'react'
import ActiveLink from 'components/active-link'
import useTranslation from 'next-translate/useTranslation'
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

// Map locale code to the flag used in 'react-country-flag'
const localeToFlags = {
  en: 'US',
  es: 'ES',
  nl: 'NL',
  ch: 'CN',
  tr: 'TR',
  vn: 'VN'
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
        <a target="_blank" href="//about.algodex.com">
          <NavTextLg>{t('header-about')}</NavTextLg>
        </a>
        <ActiveLink href="/trade" matches={/^\/trade/}>
          <NavTextLg>{t('header-trade')}</NavTextLg>
        </ActiveLink>
        <a
          target="_blank"
          href="//about.algodex.com/docs/trading-algorand-standard-assets-testnet/"
        >
          <NavTextLg>{t('header-docs')}</NavTextLg>
        </a>
        <a target="_blank" href="//about.algodex.com/support/">
          <NavTextLg>{t('header-support')}</NavTextLg>
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
          <Link href={asPath} locale={locale}>
            <a href="#">
              <NavTextLg>
                {locale} <Flag countryCode={localeToFlags[locale]} svg />
              </NavTextLg>
            </a>
          </Link>

          <LanguageDropDown>
            {i18n.locales.map((localeCd) => (
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
          >
            <NavTextSm>Docs</NavTextSm>
          </a>
          <a target="_blank" href="//about.algodex.com/support/">
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
