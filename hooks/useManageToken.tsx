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

import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isValidAddr } from '@/components/helpers'
import { activeWalletTypes, selectedAsset } from '@/components/types'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider'

const initialValues = {
  assetId: '',
  showClawbackAddr: false,
  clawbackAddr: '',
  tempClawbackAddr: '',
  showReserveAddr: false,
  reserveAddr: '',
  tempReserveAddr: '',
  showManagerAddr: false,
  managerAddr: '',
  tempManagerAddr: '',
  showFreezeAddr: false,
  freezeAddr: '',
  tempFreezeAddr: ''
}

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
    id: 'totalQuantity',
    label: 'Quantity',
    format: (value) => value.toLocaleString('en-US')
  }
]

const useManageToken = () => {
  const { activeWallet }: { activeWallet: activeWalletTypes } = useContext(WalletReducerContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialValues)
  const [isEdit, setIsEdit] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState<selectedAsset>()
  const [error, setError] = useState({})
  const {
    assetId,
    clawbackAddr,
    tempClawbackAddr,
    reserveAddr,
    tempReserveAddr,
    managerAddr,
    tempManagerAddr,
    freezeAddr,
    tempFreezeAddr
  } = formData

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    resetError(e)
  }

  const handleEdit = (e: { target: { name: string; value: string } } | null) => {
    if (e) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      setIsEdit(e.target.name)
    } else {
      setIsEdit(e)
    }
  }

  const confirmEdit = async (inputName: string, inputValue: string, tempName: string) => {
    if ((await verifyWallet(inputValue, tempName)) === 'valid') {
      setFormData({ ...formData, [inputName]: inputValue })
      handleEdit(null)
    }
  }

  const cancelEdit = (inputName: string, inputValue: string) => {
    setFormData({ ...formData, [inputName]: inputValue }) // Reset the edit field
    handleEdit(null)

    //Clear out error message if any
    resetError({
      target: { name: inputName }
    })
  }

  const resetError = (e: { target: { name: string } }) => {
    //Clear out input errors
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
    setError((prev) => ({ ...prev, all: '' }))
  }

  const verifyWallet = useCallback(async (address: string, inputName: string) => {
    //Confirm its a valid algorand address
    if (!(await isValidAddr(address.trim()))) {
      setError((prev) => ({ ...prev, [inputName]: 'Invalid Algorand address!' }))
      return 'invalid'
    }
    return 'valid'
  }, [])

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    let _error = false

    if (clawbackAddr && (await verifyWallet(clawbackAddr, 'clawbackAddr')) === 'invalid') {
      _error = true
    }

    if (reserveAddr && (await verifyWallet(reserveAddr, 'reserveAddr')) === 'invalid') {
      _error = true
    }

    if (freezeAddr && (await verifyWallet(freezeAddr, 'freezeAddr')) === 'invalid') {
      _error = true
    }
    if (managerAddr && (await verifyWallet(managerAddr, 'managerAddr')) === 'invalid') {
      _error = true
    }

    if (!_error) {
      setError(null)
      manageToken()
    }
  }

  const manageToken = () => {
    console.log('Submit token update to Algorand', formData)
    setLoading(true)
    setLoading(false)
  }

  const resetForm = () => {
    setFormData(initialValues)
    setSelectedAsset(null)
  }

  const rowData = useMemo(() => {
    if (activeWallet) {
      return activeWallet['created-assets']
        .filter((as) => !as.deleted)
        .map((asset) => ({
          ...asset,
          assetId: asset.index,
          symbol: asset.params['unit-name'],
          assetName: asset.params.name,
          totalQuantity: asset.params.total
        }))
    }
    return []
  }, [activeWallet])

  const isEligible = useMemo(() => {
    // Checks if the connected wallet is eligible to edit the token
    if (activeWallet && selectedAsset && activeWallet.address === selectedAsset.params.manager) {
      return true
    }
    return false
  }, [activeWallet, selectedAsset])

  useEffect(() => {
    if (selectedAsset) {
      setFormData((prev) => ({
        ...prev,
        assetId: `${selectedAsset.assetId}`,
        clawbackAddr: selectedAsset.params.clawback,
        tempClawbackAddr: selectedAsset.params.clawback,
        reserveAddr: selectedAsset.params.reserve,
        tempReserveAddr: selectedAsset.params.reserve,
        managerAddr: selectedAsset.params.manager,
        tempManagerAddr: selectedAsset.params.manager,
        freezeAddr: selectedAsset.params.freeze,
        tempFreezeAddr: selectedAsset.params.freeze
      }))
    }
  }, [selectedAsset])

  return {
    assetId,
    clawbackAddr,
    tempClawbackAddr,
    reserveAddr,
    tempReserveAddr,
    managerAddr,
    tempManagerAddr,
    freezeAddr,
    tempFreezeAddr,
    loading,
    selectedAsset,
    setSelectedAsset,
    activeWallet,
    error,
    rowData,
    columns,
    onSubmit,
    handleEdit,
    isEdit,
    onChange,
    cancelEdit,
    confirmEdit,
    resetForm,
    isEligible
  }
}

export default useManageToken
