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

import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

// Next Components
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// MUI Components
import { styled } from '@mui/material/styles'
import MuiLink from '@mui/material/Link'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

const NextLinkComposed = React.forwardRef(function NextLinkComposed(props, ref) {
  // eslint-disable-next-line no-unused-vars
  const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  )
})

NextLinkComposed.propTypes = {
  /**
   *
   */
  href: PropTypes.any,
  /**
   *
   */
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   *
   */
  locale: PropTypes.string,
  /**
   *
   */
  passHref: PropTypes.bool,
  /**
   *
   */
  prefetch: PropTypes.bool,
  /**
   *
   */
  replace: PropTypes.bool,
  /**
   *
   */
  scroll: PropTypes.bool,
  /**
   *
   */
  shallow: PropTypes.bool,
  /**
   *
   */
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired
}

/**
 * Link
 *
 * A styled version of the Next.js Link component
 *
 * @see https://nextjs.org/docs/api-reference/next/link
 * @component
 * @example
 * render(
 *   <Link href="/" color="secondary">
 *     Go to the home page
 *   </Link>
 * )
 */
const Link = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    // eslint-disable-next-line no-unused-vars
    role, // Link don't have roles.
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName
  })

  const isExternal =
    typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} to={href} {...other} />
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
    />
  )
})

Link.propTypes = {
  locale: PropTypes.any,
  /**
   * Active Classname
   */
  activeClassName: PropTypes.string,
  /**
   * As component
   */
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * Class name to apply
   */
  className: PropTypes.string,
  /**
   * Href location
   */
  href: PropTypes.any,
  /**
   * Link as Component
   */
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * Remove link style
   */
  noLinkStyle: PropTypes.bool,
  /**
   * Element role
   */
  role: PropTypes.string
}

export default Link
