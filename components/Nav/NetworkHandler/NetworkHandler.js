import { useEffect, useMemo } from 'react'

import NetworkBanner from './NetworkBanner'
import NetworkNotificationModal from './NetworkNotificationModal'
import useUserStore from '@/store/use-user-state'

const NetworkHandler = () => {
  const hasMainnetRibbon = useUserStore((state) => state.hasMainnetRibbon)
  const hasTestnetRibbon = useUserStore((state) => state.hasTestnetRibbon)
  const hasMainnetNotificationModal = useUserStore((state) => state.hasMainnetNotificationModal)
  const hasTestnetNotificationModal = useUserStore((state) => state.hasTestnetNotificationModal)
  const activeNetwork = useUserStore((state) => state.activeNetwork)
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

  useEffect(() => {
    hasMainnetRibbon === null && setHasMainnetRibbon(true)
    hasTestnetRibbon === null && setHasTestnetRibbon(true)
    hasMainnetNotificationModal === null && setHasMainnetNotificationModal(true)
    hasTestnetNotificationModal === null && setHasTestnetNotificationModal(true)
  }, [
    hasMainnetRibbon,
    hasTestnetRibbon,
    setHasTestnetNotificationModal,
    setHasMainnetNotificationModal
  ])

  return (
    <div>
      {isRibbonActive && <NetworkBanner />}
      {isModalActive && <NetworkNotificationModal />}
    </div>
  )
}

export default NetworkHandler
