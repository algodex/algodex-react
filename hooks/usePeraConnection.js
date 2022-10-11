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

import { PeraWalletConnect } from '@perawallet/connect'
import { useEffect } from 'react'

const peraWallet = new PeraWalletConnect()

export default function usePeraConnection(onConnect, onDisconnect, sessionUpdate) {
  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)
        if (accounts.length) {
          // Disconnect if wallet with Address already exists
          const res = localStorage.getItem('addresses')
          if (res) {
            const _hasAddress = JSON.parse(res).filter((wallet) => wallet.address === accounts[0])
            if (_hasAddress && _hasAddress.length && _hasAddress[0].type !== 'wallet-connect') {
              peraWallet.disconnect()
            } else {
              const _addresses = accounts.map((acct) => {
                const _account = {
                  type: 'wallet-connect',
                  address: acct,
                  connector: peraWallet.connector
                }
                return _account
              })
              sessionUpdate(_addresses)
            }
          }
        }
      })
      .catch((e) => {
        console.log(e, 'Session expired')
      })
  }, [])

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on('disconnect', handleDisconnectWalletClick)

        const _addresses = newAccounts.map((acct) => {
          const _account = {
            type: 'wallet-connect',
            address: acct,
            connector: peraWallet.connector
          }
          _account.connector.connected = true
          return _account
        })
        onConnect(_addresses)
      })
      .catch((error) => {
        if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
          console.log(error)
        }
      })
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect()
    // Fetch Address to disconnect
    const locStorageAddr = localStorage.getItem('addresses')
    if (locStorageAddr) {
      const _formattedAddr = JSON.parse(locStorageAddr)
      const _peraAddr = _formattedAddr.filter((addr) => addr.type === 'wallet-connect')
      _peraAddr.length && onDisconnect([_peraAddr[0]?.address])
    }
  }

  return {
    connect: handleConnectWalletClick,
    disconnect: handleDisconnectWalletClick,
    peraWalletConnector: peraWallet
  }
}
