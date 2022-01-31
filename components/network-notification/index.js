import NetworkBanner from './NetworkBanner'
import NetworkNotificationModal from './NetworkNotificationModal'
import { useEffect } from 'react'
import { useUserStore } from '../../store'

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

  const isRibbonActive = activeNetwork === 'testnet' ? hasTestnetRibbon : hasMainnetRibbon
  const isModalActive =
    activeNetwork === 'testnet' ? hasTestnetNotificationModal : hasMainnetNotificationModal

  useEffect(() => {
    hasMainnetRibbon === null && setHasMainnetRibbon(true)
    hasTestnetRibbon === null && setHasTestnetRibbon(true)
    hasMainnetNotificationModal === null && setHasMainnetNotificationModal(true)
    hasTestnetNotificationModal === null && setHasTestnetNotificationModal(true)
  }, []) // eslint-disable-line

  return (
    <div>
      {isRibbonActive && <NetworkBanner />}
      {isModalActive && <NetworkNotificationModal />}
    </div>
  )
}

export default NetworkHandler
