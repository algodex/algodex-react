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

import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { isValidAddr } from '@/components/helpers'
import { activeWalletTypes, selectedAsset } from '@/components/types'
import { WalletReducerContext } from '@/hooks/WalletsReducerProvider'

const initialValues = {
  assetId: '',
  showClawbackAddr: false,
  clawbackAddr: '',
  showReserveAddr: false,
  reserveAddr: '',
  showManagerAddr: false,
  managerAddr: '',
  showFreezeAddr: false,
  freezeAddr: ''
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
  const [selectedAsset, setSelectedAsset] = useState<selectedAsset>()
  const [error, setError] = useState({})
  const {
    assetId,
    showClawbackAddr,
    clawbackAddr,
    showReserveAddr,
    reserveAddr,
    showManagerAddr,
    managerAddr,
    showFreezeAddr,
    freezeAddr
  } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    resetError(e)
  }

  const handleShow = (e: { target: { name: string; value: boolean } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    resetError(e)
  }

  const resetError = (e: { target: { name: string } }) => {
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
    setError((prev) => ({ ...prev, all: '' }))
  }

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let _error = false

    //Confirm its a valid algorand address
    if (clawbackAddr && !(await isValidAddr(clawbackAddr.trim()))) {
      setError((prev) => ({ ...prev, clawbackAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (reserveAddr && !(await isValidAddr(reserveAddr.trim()))) {
      setError((prev) => ({ ...prev, reserveAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (freezeAddr && !(await isValidAddr(freezeAddr.trim()))) {
      setError((prev) => ({ ...prev, freezeAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (managerAddr && !(await isValidAddr(managerAddr.trim()))) {
      setError((prev) => ({ ...prev, managerAddr: 'Invalid Algorand address!' }))
      _error = true
    }

    if (!_error) {
      setError(null)
      manageToken()
    }
  }

  const manageToken = () => {
    console.log(formData)
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

  useEffect(() => {
    if (selectedAsset) {
      setFormData((prev) => ({
        ...prev,
        assetId: `${selectedAsset.assetId}`,
        clawbackAddr: selectedAsset.params.clawback,
        reserveAddr: selectedAsset.params.reserve,
        managerAddr: selectedAsset.params.manager,
        freezeAddr: selectedAsset.params.freeze
      }))
    }
  }, [selectedAsset])

  return {
    assetId,
    showClawbackAddr,
    clawbackAddr,
    showReserveAddr,
    reserveAddr,
    showManagerAddr,
    managerAddr,
    showFreezeAddr,
    freezeAddr,
    loading,
    selectedAsset,
    setSelectedAsset,
    activeWallet,
    error,
    rowData,
    columns,
    onSubmit,
    handleShow,
    onChange,
    resetForm
  }
}

export default useManageToken
