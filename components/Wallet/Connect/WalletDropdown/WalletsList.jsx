import ActiveWalletList from './ActiveWalletList'
import Button from '@mui/material/Button'
import Image from 'next/image'
import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import theme from 'theme'
import { useState } from 'react'

const WalletsList = ({ walletsLst }) => {
  return (
    <>
      <ActiveWalletList />
      <InactiveWalletsList/>
    </>
  )
}

WalletsList.propTypes = {
}

WalletsList.defaultProps = {
}

export default WalletsList
