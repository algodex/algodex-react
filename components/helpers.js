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

import toast from 'react-hot-toast'

export const formatUSDPrice = (amount) => {
  return amount > 10000 ? Math.round(amount).toLocaleString() : amount.toFixed(2).toLocaleString()
}

export const truncatedWalletAddress = (addr, size) => {
  return `${subStringFn(0, size, addr)}....${subStringFn(addr.length - size, addr.length, addr)}`
}

export const subStringFn = (start, end, string) => {
  return `${string.substring(start, end)}`
}

export const copyAddress = (address) => {
  window.navigator.clipboard.writeText(address).then(
    () => {
      toast.success('Copied wallet address to clipboard!')
    },
    () => {
      toast.error('Failed to copy wallet address to clipboard')
    }
  )
}

export const setExplorerLink = (addr, network) => {
  return network === 'testnet'
    ? `https://testnet.algoexplorer.io/address/${addr}`
    : `https://algoexplorer.io/address/${addr}`
}

export const assetVeryShortNameFn = (asset) => {
  return asset?.name && asset.name.length >= 1 ? asset.name : 'NO-NAME'
}
