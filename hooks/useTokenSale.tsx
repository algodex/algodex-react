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
  const [selectedAsset, setSelectedAsset] = useState<selectedAsset>()
  const [loading, setLoading] = useState(false)
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
    if (formData.quantity <= 0) {
      toast.error('Invalid sale amount')
      return
    }
    if (formData.quantity > selectedAsset.availableBalance) {
      toast.error('You cannot sell more than your available asa balance')
      return
    }
    createTokenSale()
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
    console.log({ formattedOrder })
    // return
    setLoading(true)
    notifier('Initializing order')
    await placeOrder(formattedOrder, { wallet: activeWallet }, notifier)
      .then((res) => {
        setLoading(false)
        console.log({ res })
        // notifier('Order successfully placed')
        notifier(null)
        lastToastId = toast.success('Order successfully placed')
      })
      .catch((err) => {
        console.log(err)
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
