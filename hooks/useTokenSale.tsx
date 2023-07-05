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
import { useAlgodex, useWalletOrdersQuery } from '@/hooks'
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
  initialValues: unknown,
  page
) => {
  const { activeWallet }: { activeWallet: activeWalletTypes } = useContext(WalletReducerContext)
  const { placeOrder, closeOrder } = useAlgodex()

  const {
    data: { orders }
  } = useWalletOrdersQuery({ wallet: activeWallet || { address: null } })
  const maxSpendableAlgo = useMaxSpendableAlgoNew(activeWallet)
  const [isEdit, setIsEdit] = useState(null)
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
    let quantityForSale: number

    if (page === 'create') {
      quantityForSale = Number(formData.quantity)
    } else {
      if (formData.quantity < selectedAsset.amount) {
        toast.error(
          'You need to end existing sale before you can reduce the total amount for sale.'
        )
        return
      }
      quantityForSale = formData.quantity - selectedAsset.amount
    }

    if (quantityForSale) {
      if (!Number(formData.perUnit) || Number(formData.perUnit) <= 0) {
        setError((prev) => ({
          ...prev,
          [page === 'create' ? 'perUnit' : 'tempPerUnit']: 'Invalid algo unit!'
        }))
        _error = true
      }

      if (quantityForSale <= 0) {
        setError((prev) => ({
          ...prev,
          [page === 'create' ? 'quantity' : 'tempQuantity']: 'Invalid sale amount!'
        }))
        _error = true
      }

      if (quantityForSale > selectedAsset.availableBalance) {
        setError((prev) => ({
          ...prev,
          [page === 'create' ? 'quantity' : 'tempQuantity']:
            'You cannot sell more than your available ASA balance'
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

        createTokenSale(quantityForSale)
      }
    }
  }

  const createTokenSale = async (amount: number) => {
    if (page === 'create' && salesToManage && salesToManage[formData.assetId]) {
      toast.error(
        'There is an active sale on this token, end sale to create a new one or update the token quantity on the manage token sale page'
      )
      return
    }
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
      amount, // Amount to Sell
      price: Number(formData.perUnit) // Price in ALGOs
    }

    setLoading(true)
    notifier('Initializing order')
    await placeOrder(formattedOrder, { wallet: activeWallet }, notifier)
      .then(() => {
        setLoading(false)
        notifier(null)
        lastToastId = toast.success(
          `Order successfully ${page === 'create' ? 'placed' : 'updated'}`
        )
        if (page === 'manage') {
          setSelectedAsset((prev) => ({
            ...prev,
            availableBalance: prev.availableBalance - amount,
            amount: formData.quantity
          }))
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(`Error: ${err.message}`, {
          id: lastToastId,
          duration: 5000
        })
      })
  }

  const endSale = async () => {
    if (activeWallet.address !== selectedAsset.params.creator) return
    const saleData = salesToManage[formData.assetId]
    const orderbookEntry = `${saleData.metadata.assetLimitPriceN}-${saleData.metadata.assetLimitPriceD}-0-${saleData.metadata.assetId}`
    const payload = {
      appId: 22045522,
      version: 6,
      type: 'sell',
      address: activeWallet.address,
      price: Number(formData.perUnit),
      amount: Number(formData.quantity),
      total: Number(formData.perUnit) * Number(formData.quantity),
      asset: { id: Number(formData.assetId), decimale: formData.decimals },
      assetId: Number(formData.assetId),
      contract: {
        creator: activeWallet.address,
        escrow: saleData.metadata.escrowAddress,
        N: saleData.metadata.assetLimitPriceN,
        D: saleData.metadata.assetLimitPriceD,
        entry: orderbookEntry
      },
      wallet: activeWallet
    }
    setLoading(true)
    notifier('Initializing cancel')

    await closeOrder(payload, notifier)
      .then(() => {
        setLoading(false)
        notifier(null)
        lastToastId = toast.success('Order successfully cancelled')
        resetForm()
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

  const handleEdit = (e: { target: { name: string; value: string } } | null) => {
    if (e) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      setIsEdit(e.target.name)
    } else {
      setIsEdit(e)
    }
  }

  const confirmEdit = async (inputName: string, inputValue: string) => {
    if (inputValue) {
      setFormData({ ...formData, [inputName]: inputValue })
      handleEdit(null)
    }
  }

  const cancelEdit = (inputName?: string, inputValue?: string) => {
    if (inputName && inputValue) {
      setFormData({ ...formData, [inputName]: inputValue }) // Reset the edit field
    }
    handleEdit(null)
    //Clear out error message if any
    resetError({
      target: { name: inputName }
    })
  }

  const salesToManage = useMemo(() => {
    if (orders && activeWallet && activeWallet['created-assets']) {
      const createdAssets = {}
      activeWallet['created-assets']
        .filter((as) => !as.deleted)
        .forEach(({ index, params }) => {
          createdAssets[index] = params
        })
      const sales = {}
      orders
        .filter((order) => order.type === 'SELL' && createdAssets[order.asset.id])
        .forEach((order) => {
          sales[order.asset.id] = order
        })

      // Return null if after filtering, there is no sales to manage.
      if (Object.keys(sales).length > 0) {
        return sales
      } else {
        return null
      }
    }
    return null
  }, [orders, activeWallet])

  const rowData = useMemo(() => {
    // Return empty if user is on manage sales page and there is no sale to manage
    if (
      activeWallet &&
      activeWallet['created-assets'] &&
      (page === 'create' || (page === 'manage' && salesToManage))
    ) {
      //If on manage sales page, return assets that are available in the the open orders only.
      return activeWallet['created-assets']
        .filter(
          (as) =>
            !as.deleted &&
            (page === 'create' || (page === 'manage' && salesToManage[as.index])) &&
            as.index.toString().startsWith(formData.assetId)
        )
        .map((asset) => ({
          ...asset,
          assetId: asset.index,
          symbol: asset.params['unit-name'],
          assetName: asset.params.name,
          totalQuantity: asset.params.total / 10 ** asset.params.decimals,
          availableBalance:
            activeWallet.assets.find((asst) => asst['asset-id'] === asset.index).amount /
            10 ** asset.params.decimals,
          price: salesToManage ? Number(salesToManage[asset.index]?.price) : '',
          amount: salesToManage ? Number(salesToManage[asset.index]?.amount) : ''
        }))
    }
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWallet, formData.assetId, salesToManage])

  useEffect(() => {
    if (selectedAsset) {
      setFormData((prev) => ({
        ...prev,
        assetId: `${selectedAsset.assetId}`,
        decimals: selectedAsset.params.decimals,
        perUnit: page === 'create' ? '' : selectedAsset.price,
        quantity: page === 'create' ? '' : selectedAsset.amount
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
    resetForm,
    isEdit,
    cancelEdit,
    confirmEdit,
    handleEdit,
    endSale
  }
}
