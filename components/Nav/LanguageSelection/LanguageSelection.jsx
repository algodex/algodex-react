/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
  Flag,
  LanguageButton,
  LanguageDropDown,
  LanguageDropdownContainerMob,
  LanguageItem,
  LanguagesContainer,
  NavTextSm
} from './language-selection.css'
import { FormControl, MenuItem, Select } from '@mui/material';

// import Link from 'next/link'
import Link from '@/components/Nav/Link'
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import i18n from 'i18n.json'
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

const NavTextLg = ({children, isActive, border}) => {
  return <Typography
    variant="subtitle_medium_bold"
    sx={{
      // display: 'none',
      // justifyContent: 'center',
      // alignItems: 'center',
      textAlign: 'center',
      textTransform: 'uppercase',
      // letterSpacing: '0.2rem',
      // fontWeight: '600',
      // fontSize: `${fontSize}`,
      color: 'gray.500',
      // color: `${color}`,
      cursor: 'pointer',
      transition: 'color 0.1s ease-in',
      '&:hover': {
        color: 'gray.100',
      },
      '& > a': {
        color: 'gray.100',
        padding: '1rem 0',
    
        textDecoration: 'none',
        borderBottom: 
          `${isActive && border ? '6px inset green.500' : '6px inset transparent'}`,
    
        '&:hover': {
          color: 'gray.100',
        },
    
        '&:active': {
          color: 'gray.100',
        },
    
        '@media (min-width: 1024px)': {
          color: `${isActive ? 'gray.100' : 'gray.500'}`
        }
      }
    }}
  >
    {children}
  </Typography>
}

NavTextLg.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  isActive: PropTypes.bool,
  border: PropTypes.string,
  children: PropTypes.string
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '20rem',
    },
  },
};


export const LanguageSelection = ({ isMobile }) => {
  // const { t } = useTranslation('common')
  const { asPath, locale } = useRouter()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const renderLanguageMobile = () => {
    const locales = i18n.locales.filter((localeCd) => localeCd !== locale)
    return locales.map((localeCd, idx) => {
      return (
        <Link key={idx} href={asPath} locale={localeCd} data-testid="dropdown-item-mobile">
          <NavTextSm
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            style={{ marginBottom: '0.4rem' }}
            data-testid="dropdown-action-mobile"
          >
            {localeCd}{' '}
            <Flag data-testid="flat-item-mobile" countryCode={localeToFlags[localeCd]} svg />
          </NavTextSm>
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
      // <LanguagesContainer style={{ display: 'flex'}}>
      //   <Link href={asPath} locale={locale} data-testid="dropdown-button-web">
      //     <NavTextLg>
      //       {locale}
      //       <Flag countryCode={localeToFlags[locale]} svg />
      //     </NavTextLg>
      //   </Link>

      //   <LanguageDropDown data-testid="dropdown-container-web">
      //     <LanguageItem key={locale}>
      //       <Link href={asPath} locale={locale}>
      //         <NavTextLg>
      //           {locale} <Flag countryCode={localeToFlags[locale]} svg />
      //         </NavTextLg>
      //       </Link>
      //     </LanguageItem>
      //       {i18n.locales
      //       .filter((localeCd) => localeCd !== locale)
      //       .map((localeCd) => (
      //         <LanguageItem key={localeCd} data-testid="dropdown-item-web">
      //           <Link href={asPath} locale={localeCd}>
      //             <NavTextLg>
      //               {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
      //             </NavTextLg>
      //           </Link>
      //         </LanguageItem>
      //       ))}
          
      //   </LanguageDropDown>
      // </LanguagesContainer>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={locale}
          variant="outlined"
          MenuProps={MenuProps}
          input={<OutlinedInput label="Name" />}
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '.MuiSelect-iconOutlined': {
              display: 'none'
            }
          }}
        >
          <MenuItem value={locale}
            sx={{
              '&:first-child': {
                marginTop: '-2rem',
              }
            }}
          >
            <Link href={asPath} locale={locale} data-testid="dropdown-button-web">
              <NavTextLg>
                {locale}
                <Flag countryCode={localeToFlags[locale]} svg />
              </NavTextLg>
            </Link>
          </MenuItem>
          {i18n.locales
            .filter((localeCd) => localeCd !== locale)
            .map((localeCd) => (
              <MenuItem
                sx={{ 
                  paddingLeft: '0.6rem',
                  height: '50px',
                  lineHeight: '50px'
                }} 
                key={localeCd}
                data-testid="dropdown-item-web"
              >
                  <Link href={asPath} locale={localeCd}>
                    <NavTextLg>
                      {localeCd} <Flag countryCode={localeToFlags[localeCd]} svg />
                    </NavTextLg>
                  </Link>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
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
