import React from 'react'
import PropTypes from 'prop-types'
import AlgodexAPI from '@algodex/algodex-sdk'
import { createContext, useMemo } from 'react'

const AlgodexAPIContext = createContext({})

/**
 *
 * @param {Object} props Component Properties
 * @param {AlgodexAPI} props.dex The AlgodexAPI Instance
 * @param {JSX.Element} [props.children] Component Children
 * @returns {JSX.Element}
 */
export function Provider({ children, dex }) {
  const context = useMemo(() => dex, [dex])
  return <AlgodexAPIContext.Provider value={context}>{children}</AlgodexAPIContext.Provider>
}
Provider.propTypes = {
  /**
   * Children Components
   */
  children: PropTypes.node,
  /**
   * Instance of a AlgodexAPI
   */
  dex: PropTypes.instanceOf(AlgodexAPI)
}
export default AlgodexAPIContext
