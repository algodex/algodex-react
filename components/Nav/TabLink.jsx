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
