import { filter, find } from 'lodash'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useMemo } from 'react'

const Container = styled.div`
  position: absolute;
  min-height: 16rem;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  max-width: 23rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 4px;
  overflow: none;
  right: 9rem;
  top: 4rem;
`

const WalletConnectDropdown = ({ closeDropdown }) => {
  const { addresses, wallet } = useAlgodex()

  const sortedWalletsList = useMemo(() => {
    if (addresses) {
      const activeWallet = find(addresses, (o) => o.address === wallet?.address)
      const inactiveWallet = filter(addresses, (o) => o.address !== wallet?.address)
      console.log(activeWallet, inactiveWallet, 'hey')
      return {
        activeWallet,
        inactiveWallet
      }
    }
  }, [addresses, wallet])

  return (
    <Container className="">
      <div className="flex flex-col justify-between">
        <DropdownHeader closeFn={closeDropdown} />
        <DropdownBody activeWalletAddress={wallet?.address} sortedWalletsList={sortedWalletsList} />
        <DropdownFooter />
      </div>
    </Container>
  )
}

WalletConnectDropdown.propTypes = {
  closeDropdown: PropTypes.func
}

export default WalletConnectDropdown
