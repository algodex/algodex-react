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

import { useEffect, useMemo } from 'react'

import NetworkBanner from './NetworkBanner'
import NetworkNotificationModal from './NetworkNotificationModal'
import useUserStore from '@/store/use-user-state'
import { getActiveNetwork } from 'services/environment'

const NetworkHandler = () => {
  const hasMainnetRibbon = useUserStore((state) => state.hasMainnetRibbon)
  const hasTestnetRibbon = useUserStore((state) => state.hasTestnetRibbon)
  const hasMainnetNotificationModal = useUserStore((state) => state.hasMainnetNotificationModal)
  const hasTestnetNotificationModal = useUserStore((state) => state.hasTestnetNotificationModal)

  const activeNetwork = getActiveNetwork()
  const setHasMainnetRibbon = useUserStore((state) => state.setHasMainnetRibbon)
  const setHasTestnetRibbon = useUserStore((state) => state.setHasTestnetRibbon)
  const setHasMainnetNotificationModal = useUserStore(
    (state) => state.setHasMainnetNotificationModal
  )
  const setHasTestnetNotificationModal = useUserStore(
    (state) => state.setHasTestnetNotificationModal
  )

  const isRibbonActive = useMemo(() => {
    return activeNetwork === 'testnet' ? hasTestnetRibbon : hasMainnetRibbon
  }, [activeNetwork, hasTestnetRibbon, hasMainnetRibbon])

  const isModalActive = useMemo(() => {
    return activeNetwork === 'testnet' ? hasTestnetNotificationModal : hasMainnetNotificationModal
  }, [activeNetwork, hasTestnetNotificationModal, hasMainnetNotificationModal])

  useMemo(() => {
    hasMainnetRibbon === null && setHasMainnetRibbon(true)
    hasTestnetRibbon === null && setHasTestnetRibbon(true)
    hasMainnetNotificationModal === null && setHasMainnetNotificationModal(true)
    hasTestnetNotificationModal === null && setHasTestnetNotificationModal(true)
  }, [hasMainnetRibbon, setHasMainnetRibbon, hasTestnetRibbon,
    setHasTestnetRibbon, hasMainnetNotificationModal,
    setHasMainnetNotificationModal, hasTestnetNotificationModal,
    setHasTestnetNotificationModal])

  return (
    <section>
      {isRibbonActive && <NetworkBanner />}
      {isModalActive && <NetworkNotificationModal />}
    </section>
  )
}

export default NetworkHandler
