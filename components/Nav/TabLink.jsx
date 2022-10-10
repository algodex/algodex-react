/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'

// MUI Components
import MUITab from '@mui/material/Tab'

// Custom Components
import CustomLink from '@/components/Nav/Link'
import { styled } from '@mui/system'

const Tab = styled(MUITab)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.gray[100]};
  padding: 1rem 0;

  text-decoration: none;
  border-bottom: ${({ isActive, border, theme }) =>
    isActive && border ? `6px inset ${theme.palette.green[500]}` : `6px inset transparent`};

  &:hover {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  &:active {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  @media (min-width: 1024px) {
    color: ${({ isActive, theme }) =>
      isActive ? theme.palette.gray[100] : theme.palette.gray[500]};
  }
`

/**
 * ListItemLink
 *
 * @param {Object} props The properties
 * @param {object|string} props.locale
 * @param {string} props.to
 *
 * @returns {JSX.Element}
 * @see https://mui.com/guides/routing/#list
 * @constructor
 */
function TabLink(props) {
  const { locale, to, ...rest } = props
  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <CustomLink locale={locale} href={to} ref={ref} {...itemProps} role={undefined} />
      }),
    [to, locale]
  )

  return <Tab component={renderLink} {...rest} />
}

TabLink.propTypes = {
  /**
   * icon
   */
  icon: PropTypes.element,
  /**
   * to
   */
  to: PropTypes.string.isRequired,
  locale: PropTypes.string
}

export default TabLink
