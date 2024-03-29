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
import ActiveWalletList from './ActiveWalletList'
import InactiveWalletsList from './InactiveWalletsList'
import PropTypes from 'prop-types'
import WalletOptionsList from './WalletOptionsList'
import { WalletReducerContext } from '../../../../hooks/WalletsReducerProvider'
import theme from 'theme'
import { getWalletLogo } from '../../../helpers'

// import { useState, useContext } from 'react'
// import { WalletContext } from '../../WalletContext'
import { useState, useCallback } from 'react'

const DropdownBody = ({
  walletDisconnectMap,
  wallet,
  activeWalletAddress,
  sortedWalletsList,
  addresses,
  myAlgoOnClick,
  peraConnectOnClick,
  deflyConnectOnClick,
  isPeraConnected,
  isDeflyConnected
}) => {
  const [isConnectingAddress, setIsConnectingAddress] = useState(false)
  return (
    <div
      className="p-2"
      style={{
        backgroundColor: theme.colors.gray['600']
      }}
    >
      {/* <WalletOptionsList
        isConnectingAddress={isConnectingAddress}
        setIsConnectingAddress={setIsConnectingAddress}
        addresses={addresses}
        myAlgoOnClick={myAlgoOnClick}
        peraConnectOnClick={peraConnectOnClick}
        walletconnectGeneralOnClick={walletconnectGeneralOnClick}
        isPeraConnected={isPeraConnected}
      /> */}
      {!activeWalletAddress || isConnectingAddress ? (
        <WalletOptionsList
          isRenderingList={!activeWalletAddress}
          isConnectingAddress={isConnectingAddress}
          setIsConnectingAddress={setIsConnectingAddress}
          addresses={addresses}
          myAlgoOnClick={myAlgoOnClick}
          peraConnectOnClick={peraConnectOnClick}
          deflyConnectOnClick={deflyConnectOnClick}
          isPeraConnected={isPeraConnected}
          isDeflyConnected={isDeflyConnected}
        />
      ) : (
        <>
          <ActiveWalletList
            getWalletLogo={getWalletLogo}
            wallet={wallet}
            disconnectWalletFn={() => walletDisconnectMap[wallet.type](wallet)}
          />
          {sortedWalletsList.inactiveWallet.length > 0 && (
            <InactiveWalletsList
              getWalletLogo={getWalletLogo}
              walletsList={sortedWalletsList.inactiveWallet}
              walletDisconnectMap={walletDisconnectMap}
            />
          )}
          <WalletOptionsList
            isRenderingList={!activeWalletAddress}
            isConnectingAddress={isConnectingAddress}
            setIsConnectingAddress={setIsConnectingAddress}
            addresses={addresses}
            myAlgoOnClick={myAlgoOnClick}
            peraConnectOnClick={peraConnectOnClick}
            deflyConnectOnClick={deflyConnectOnClick}
            isPeraConnected={isPeraConnected}
            isDeflyConnected={isDeflyConnected}
          />
        </>
      )}
    </div>
  )
}

DropdownBody.propTypes = {
  activeWalletAddress: PropTypes.string,
  sortedWalletsList: PropTypes.object,
  // closeFn: PropTypes.func,
  wallet: PropTypes.object,
  addresses: PropTypes.array,
  myAlgoOnClick: PropTypes.func,
  peraConnectOnClick: PropTypes.func,
  deflyConnectOnClick: PropTypes.func,
  isPeraConnected: PropTypes.bool,
  isDeflyConnected: PropTypes.bool,
  walletDisconnectMap: PropTypes.object
}

DropdownBody.defaultProps = {
  activeWalletAddress: ''
}

export default DropdownBody
