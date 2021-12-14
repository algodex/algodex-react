import {
  Flag,
  LanguageButton,
  LanguageDropDown,
  LanguageDropdownContainerMob,
  LanguageItem,
  LanguagesContainer,
  NavTextLg,
  NavTextSm
} from './language-selection.css'

import Link from 'next/link'
import PropTypes from 'prop-types'
import i18n from '../../i18n.json'
import { useRouter } from 'next/router'
import { useState } from 'react'

// import useTranslation from 'next-translate/useTranslation'

// window.matchMedia('(min-width: 1536px)').matches

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

const LanguageSelection = ({ isMobile }) => {
  // const { t } = useTranslation('common')
  const { asPath, locale } = useRouter()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const renderLanguageMobile = () => {
    const locales = i18n.locales.filter((localeCd) => localeCd !== locale)
    return locales.map((localeCd, idx) => {
      return (
        <Link key={idx} href={asPath} locale={localeCd}>
          <a href="#top">
            <NavTextSm
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              style={{ marginBottom: '0.4rem' }}
            >
              {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
            </NavTextSm>
          </a>
        </Link>
      )
    })
  }

  const renderForMobile = () => {
    return (
      <>
        <LanguageButton role="button" onClick={() => setIsLanguageOpen(!isLanguageOpen)}>
          <NavTextSm>
            {locale} <Flag countryCode={localeToFlags[locale]} svg />
          </NavTextSm>
        </LanguageButton>
        {isLanguageOpen && (
          <LanguageDropdownContainerMob>{renderLanguageMobile()}</LanguageDropdownContainerMob>
        )}
      </>
    )
  }

  const renderForWeb = () => {
    return (
      <LanguagesContainer>
        <Link href={asPath} locale={locale}>
          <a href="#top">
            <NavTextLg>
              {locale} <Flag countryCode={localeToFlags[locale]} svg />
            </NavTextLg>
          </a>
        </Link>

        <LanguageDropDown>
          <LanguageItem key={locale}>
            <Link href={asPath} locale={locale}>
              <a href="#top">
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
                  <a href="#top">
                    <NavTextLg>
                      {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
                    </NavTextLg>
                  </a>
                </Link>
              </LanguageItem>
            ))}
        </LanguageDropDown>
      </LanguagesContainer>
    )
  }

  return <>{isMobile ? renderForMobile() : renderForWeb()}</>
}

LanguageSelection.propTypes = {
  isMobile: PropTypes.bool
  // isLanguageOpen: PropTypes.bool,
}

LanguageSelection.defaultProps = {
  // isLanguageOpen: true
}

LanguageSelection.displayName = 'LanguageSelection'

export default LanguageSelection
