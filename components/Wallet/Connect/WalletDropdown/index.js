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

import { filter, find } from 'lodash'
import { useContext, useMemo } from 'react'
import useWallets, { WalletsContext } from '@/hooks/useWallets'

import DropdownBody from './DropdownBody'
import DropdownFooter from './DropdownFooter'
import DropdownHeader from './DropdownHeader'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useEventDispatch } from '@/hooks/useEvents'

const styleReset = css`
  margin: 0;
  padding: 0;
  // border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`
const Container = styled.div`
  p {
    ${styleReset}
  }
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
  const { isConnected } = useAlgodex()
  const [addresses] = useContext(WalletsContext)
  const dispatcher = useEventDispatch()
  const { wallet, peraConnect, myAlgoConnect } = useWallets()
  const WALLETS_CONNECT_MAP = {
    'my-algo-wallet': myAlgoConnect,
    'pera-connect': peraConnect
  }

  const handleConnectionDropdown = (closeDropdown) => {
    dispatcher('connecting-wallet', {
      isOpen: closeDropdown
    })
  }

  const myAlgoOnClick = () => {
    handleConnectionDropdown(false)
    WALLETS_CONNECT_MAP['my-algo-wallet']()
  }

  const peraConnectOnClick = () => {
    handleConnectionDropdown(false)
    WALLETS_CONNECT_MAP['pera-connect']()
  }

  const isPeraConnected = useMemo(() => {
    if (isConnected) {
      const peraAddr = isConnected && addresses.filter((addr) => addr.type === 'wallet-connect')
      return peraAddr.length > 0
    }
    return false
  }, [isConnected, addresses])

  const sortedWalletsList = useMemo(() => {
    if (addresses) {
      const activeWallet = find(addresses, (o) => o.address === wallet?.address)
      const inactiveWallet = filter(addresses, (o) => o.address !== wallet?.address)
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
        <DropdownBody
          activeWalletAddress={wallet?.address}
          sortedWalletsList={sortedWalletsList}
          closeFn={closeDropdown}
          addresses={addresses}
          myAlgoOnClick={myAlgoOnClick}
          peraConnectOnClick={peraConnectOnClick}
          isPeraConnected={isPeraConnected}
        />
        <DropdownFooter />
      </div>
    </Container>
  )
}

WalletConnectDropdown.propTypes = {
  closeDropdown: PropTypes.func
}

export default WalletConnectDropdown
