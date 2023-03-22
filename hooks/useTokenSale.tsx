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

import { activeWalletTypes, selectedAsset } from '@/components/types'
import { useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAlgodex } from '@/hooks'
import { useMaxSpendableAlgoNew } from '@/hooks/useMaxSpendableAlgo'

import { WalletReducerContext } from './WalletsReducerProvider'

const columns = [
  {
    id: 'symbol',
    label: 'Symbol'
  },
  {
    id: 'assetName',
    label: 'Name'
  },
  {
    id: 'assetId',
    label: 'AssetId'
  },
  {
    id: 'availableBalance',
    label: 'Available Balance',
    format: (value) => value.toLocaleString('en-US')
  }
]

export const useTokenSale = (
  formData,
  setFormData: React.Dispatch<React.SetStateAction<unknown>>,
  initialValues: unknown
) => {
  const { activeWallet }: { activeWallet: activeWalletTypes } = useContext(WalletReducerContext)
  const { placeOrder } = useAlgodex()
  const maxSpendableAlgo = useMaxSpendableAlgoNew(activeWallet)

  const [selectedAsset, setSelectedAsset] = useState<selectedAsset>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const windowHost = globalThis.location
    ? globalThis.location.protocol + '//' + globalThis.location.host
    : null
  let lastToastId
  const notifier = (msg) => {
    if (lastToastId) {
      toast.dismiss(lastToastId)
    }
    if (msg === null) return
    lastToastId = toast.loading(msg, { duration: 30 * 60 * 1000 }) // Awaiting signature, or awaiting confirmations
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    let _error = false
    if (!formData.perUnit || formData.perUnit <= 0) {
      setError((prev) => ({ ...prev, perUnit: 'Invalid algo unit!' }))
      _error = true
    }

    if (!formData.quantity || formData.quantity <= 0) {
      setError((prev) => ({ ...prev, quantity: 'Invalid sale amount!' }))
      _error = true
    }

    if (formData.quantity > selectedAsset.availableBalance) {
      setError((prev) => ({
        ...prev,
        quantity: 'You cannot sell more than your available asa balance'
      }))
      _error = true
    }
    if (maxSpendableAlgo === 0) {
      toast.error(
        'Insufficient Algo Balance: See algorand documentation for minimum balance requirements'
      )
      _error = true
    }
    if (!_error) {
      setError(null)
      createTokenSale()
    }
  }

  const createTokenSale = async () => {
    const formattedOrder = {
      asset: {
        id: Number(formData.assetId), // Asset Index
        decimals: Number(formData.decimals) // Asset Decimals
      },
      execution: 'both', // Type of exeuction
      type: 'sell', // Order Type
      address: activeWallet.address,
      wallet: activeWallet,
      appId: 22045522,
      version: 6,
      amount: Number(formData.quantity), // Amount to Sell
      price: Number(formData.perUnit) // Price in ALGOs
    }
    // return
    setLoading(true)
    notifier('Initializing order')
    await placeOrder(formattedOrder, { wallet: activeWallet }, notifier)
      .then(() => {
        setLoading(false)
        notifier(null)
        lastToastId = toast.success('Order successfully placed')
      })
      .catch((err) => {
        setLoading(false)
        toast.error(`Error: ${err.message}`, {
          id: lastToastId,
          duration: 5000
        })
      })
  }

  const resetForm = () => {
    setFormData(initialValues)
    setSelectedAsset(null)
  }

  const resetError = (e: { target: { name: string } }) => {
    //Clear out input errors
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
    setError((prev) => ({ ...prev, all: '' }))
  }

  const rowData = useMemo(() => {
    if (activeWallet && activeWallet['created-assets']) {
      return activeWallet['created-assets']
        .filter((as) => !as.deleted && as.index.toString().startsWith(formData.assetId))
        .map((asset) => ({
          ...asset,
          assetId: asset.index,
          symbol: asset.params['unit-name'],
          assetName: asset.params.name,
          totalQuantity: asset.params.total / 10 ** asset.params.decimals,
          availableBalance:
            activeWallet.assets.find((asst) => asst['asset-id'] === asset.index).amount /
            10 ** asset.params.decimals
        }))
    }
    return []
  }, [activeWallet, formData.assetId])

  useEffect(() => {
    if (selectedAsset) {
      setFormData((prev) => ({
        ...prev,
        assetId: `${selectedAsset.assetId}`,
        reserveAddr: selectedAsset.params.reserve,
        decimals: selectedAsset.params.decimals
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAsset])

  return {
    rowData,
    error,
    resetError,
    onSubmit,
    selectedAsset,
    setSelectedAsset,
    activeWallet,
    columns,
    loading,
    windowHost,
    resetForm
  }
}
