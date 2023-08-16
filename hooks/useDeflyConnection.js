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

import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { useEffect } from 'react'

// import algosdk from 'algosdk '
import signer from '@algodex/algodex-sdk/lib/wallet/signers/PeraConnect'

const deflyWallet = new DeflyWalletConnect()

export async function deflySigner(orders) {
  const signedTxn = await signer(orders, deflyWallet)
  return signedTxn
}

export default function useDeflyConnection(onConnect, onDisconnect, sessionUpdate) {
  useEffect(() => {
    // Reconnect to the session when the component is mounted
    deflyWallet
      .reconnectSession()
      .then((accounts) => {
        deflyWallet.connector.on('disconnect', handleDisconnectWalletClick)

        if (accounts.length) {
          // Disconnect if wallet with Address already exists
          const res = localStorage.getItem('addresses')
          if (res) {
            const _hasAddress = JSON.parse(res).filter((wallet) => wallet.address === accounts[0])
            if (
              _hasAddress &&
              _hasAddress.length &&
              _hasAddress[0].type !== 'wallet-connect-defly'
            ) {
              deflyWallet.disconnect()
            } else {
              const _addresses = accounts.map((acct) => {
                const _account = {
                  type: 'wallet-connect-defly',
                  address: acct,
                  connector: {
                    ...deflyWallet.connector,
                    sign: deflySigner,
                    accounts: [acct]
                  },
                  deflyWallet: deflyWallet
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
    console.log('hit defly wallet new')
    deflyWallet
      .connect()
      .then((newAccounts) => {
        deflyWallet.connector.on('disconnect', handleDisconnectWalletClick)

        const _addresses = newAccounts.map((acct) => {
          const _account = {
            type: 'wallet-connect-defly',
            address: acct,
            connector: {
              ...deflyWallet.connector,
              sign: deflySigner,
              accounts: [acct]
            },
            deflyWallet: deflyWallet
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
    console.log(deflyWallet)
    onDisconnect([{ type: 'wallet-connect-defly', address: deflyWallet.connector.accounts[0] }])

    deflyWallet.disconnect()
    // Fetch Address to disconnect
  }

  return {
    connect: handleConnectWalletClick,
    disconnect: handleDisconnectWalletClick,
    connector: deflyWallet
  }
}
