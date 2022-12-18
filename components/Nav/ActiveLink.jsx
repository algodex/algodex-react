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

import React, { Children, useMemo } from 'react'

import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

/**
 * NavActiveLink
 *
 * Custom Next.js <Link/> element that passes a boolean `isActive` to its
 * child if the current route matches The child element should be a styled component
 * with active styles determined by the value of `isActive`.
 *
 * @param {object} props Component Properties
 * @param {RegExp} props.matches Regular expression
 * @param {*} props.children React Children
 * @returns {JSX.Element}
 * @constructor
 */
const NavActiveLink = ({ children, matches, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)

  const isActive = useMemo(() => {
    return matches ? matches.test(asPath) : asPath === props.href
  }, [asPath, matches, props.href])

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        isActive
      })}
    </Link>
  )
}

NavActiveLink.propTypes = {
  children: PropTypes.node,
  matches: PropTypes.instanceOf(RegExp),
  href: PropTypes.string
}

export default NavActiveLink
