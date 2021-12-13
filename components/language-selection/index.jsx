import {
  Flag,
  LanguageButton,
  LanguageDropdownContainerMob,
  NavTextSm
} from './language-selection.css'

import Link from 'next/link'
import PropTypes from 'prop-types'
import i18n from '../../i18n.json'
import theme from '../../theme'
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
          <a href="#">
            <NavTextSm style={{ marginBottom: '0.4rem' }}>
              {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
            </NavTextSm>
          </a>
        </Link>
      )
    })
  }

  const renderForMobile = () => {
    return (
      <div>
        <div>
          <LanguageButton
            role="button"
            style={{
              background: theme.colors.gray['700'],
              padding: '0.3rem 0.6rem',
              borderRadius: '3px'
            }}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <NavTextSm>
              {locale} <Flag countryCode={localeToFlags[locale]} svg />
            </NavTextSm>
          </LanguageButton>
          {isLanguageOpen && (
            <LanguageDropdownContainerMob>{renderLanguageMobile()}</LanguageDropdownContainerMob>
          )}
        </div>
      </div>
    )
  }

  const renderForWeb = () => <div></div>

  return <div>{isMobile ? renderForMobile() : renderForWeb()}</div>
}

LanguageSelection.propTypes = {
  isMobile: PropTypes.bool
  // isLanguageOpen: PropTypes.bool,
}

LanguageSelection.defaultProps = {
  isMobile: true
  // isLanguageOpen: true
}

LanguageSelection.displayName = 'LanguageSelection'

export default LanguageSelection
