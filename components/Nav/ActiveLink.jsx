import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

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

  const isActive = matches ? matches.test(asPath) : asPath === props.href

  return (
    <Link {...props} data-testid="activelink-element">
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
