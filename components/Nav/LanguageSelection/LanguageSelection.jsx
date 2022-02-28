import Link from 'next/link'
import PropTypes from 'prop-types'
import i18n from 'i18n.json'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from '@emotion/styled'
import ReactCountryFlag from 'react-country-flag'
import { NavTextSm, NavTextLg } from '@/components/Nav/Typography'

const Flag = styled(ReactCountryFlag)`
  margin-left: 0.5rem;
  width: 1rem;
  height: auto;
`

const LanguageButton = styled.div`
  @media (max-width: 1024px) {
    background: ${({ theme }) => theme.colors.gray['700']};
    padding: 0.3rem 0.6rem;
    border-radius: 3px;
  }
`

const LanguageDropdownContainerMob = styled.div`
  position: absolute;
  top: 45px;
  right: 54px;
  z-index: 40;
  background: ${({ theme }) => theme.colors.gray['700']};
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 35vh;
  overflow-x: scroll;
`

const LanguagesContainer = styled.ul`
  width: 100px;
  &:hover,
  &:focus-within {
    ul {
      position: absolute;
      display: block;
      top: 20px;
      width: 100px;
    }
  }
`

const LanguageDropDown = styled.ul`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  display: none;
  max-height: 500px;
  overflow: scroll;
`

const LanguageItem = styled.li`
  display: block;
  height: 50px;

  span {
    line-height: 50px;
  }
`

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
  jp: 'JP',
  ru: 'RU',
  se: 'SE',
  sk: 'SK',
  hu: 'HU',
  no: 'NO',
  ct: 'ES-CT',
  th: 'TH',
  in: 'IN',
  de: 'DE',
  kr: 'KR',
  fr: 'FR',
  pl: 'PL'
}

export const LanguageSelection = ({ isMobile }) => {
  // const { t } = useTranslation('common')
  const { asPath, locale } = useRouter()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const renderLanguageMobile = () => {
    const locales = i18n.locales.filter((localeCd) => localeCd !== locale)
    return locales.map((localeCd, idx) => {
      return (
        <Link key={idx} href={asPath} locale={localeCd}>
          <a href="#top" data-testid="dropdown-item-mobile">
            <NavTextSm
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              style={{ marginBottom: '0.4rem' }}
              data-testid="dropdown-action-mobile"
            >
              {localeCd}{' '}
              <Flag data-testid="flat-item-mobile" countryCode={localeToFlags[localeCd]} svg />
            </NavTextSm>
          </a>
        </Link>
      )
    })
  }

  const renderForMobile = () => {
    return (
      <>
        <LanguageButton
          data-testid="dropdown-button-mobile"
          role="button"
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
        >
          <NavTextSm>
            {locale} <Flag countryCode={localeToFlags[locale]} svg />
          </NavTextSm>
        </LanguageButton>
        {isLanguageOpen && (
          <LanguageDropdownContainerMob data-testid="dropdown-container-mobile">
            {renderLanguageMobile()}
          </LanguageDropdownContainerMob>
        )}
      </>
    )
  }

  const renderForWeb = () => {
    return (
      <LanguagesContainer>
        <Link href={asPath} locale={locale}>
          <a href="#top" data-testid="dropdown-button-web">
            <NavTextLg>
              {locale} <Flag countryCode={localeToFlags[locale]} svg />
            </NavTextLg>
          </a>
        </Link>

        <LanguageDropDown data-testid="dropdown-container-web">
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
              <LanguageItem key={localeCd} data-testid="dropdown-item-web">
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
