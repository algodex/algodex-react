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
  setFormData: React.Dispatch<React.SetStateAction<unknown>>,
  initialValues: unknown
) => {
  const { activeWallet }: { activeWallet: activeWalletTypes } = useContext(WalletReducerContext)
  const [selectedAsset, setSelectedAsset] = useState<selectedAsset>()
  const [loading, setLoading] = useState(false)
  const windowHost = globalThis.location
    ? globalThis.location.protocol + '//' + globalThis.location.host
    : null

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoading(false)
  }

  const resetForm = () => {
    setFormData(initialValues)
    setSelectedAsset(null)
  }

  const rowData = useMemo(() => {
    if (activeWallet && activeWallet['created-assets']) {
      return activeWallet['created-assets']
        .filter((as) => !as.deleted)
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
