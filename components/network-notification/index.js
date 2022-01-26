import NetworkBanner from './NetworkBanner'
import NetworkNotificationModal from './NetworkNotificationModal'
import { useEffect } from 'react'
import useUserStore from 'store/use-user-state'
import { getActiveNetwork } from 'services/environment'

const NetworkHandler = () => {
  const activeNetwork = getActiveNetwork()

  const {
    hasMainnetRibbon,
    hasTestnetRibbon,
    hasMainnetNotificationModal,
    hasTestnetNotificationModal,
    setHasMainnetRibbon,
    setHasTestnetRibbon,
    setHasMainnetNotificationModal,
    setHasTestnetNotificationModal
  } = useUserStore((state) => state)

  useEffect(() => {
    hasMainnetNotificationModal === null && setHasMainnetNotificationModal(true)
    hasTestnetNotificationModal === null && setHasTestnetNotificationModal(true)
    hasTestnetRibbon === null && setHasTestnetRibbon(true)
    hasMainnetRibbon === null && setHasMainnetRibbon(true)
  }, [
    hasTestnetRibbon,
    hasMainnetRibbon,
    hasMainnetNotificationModal,
    hasTestnetNotificationModal,
    setHasTestnetNotificationModal,
    setHasMainnetNotificationModal,
    setHasTestnetRibbon,
    setHasMainnetRibbon
  ])

  return (
    <div>
      <NetworkBanner
        activeNetwork={activeNetwork}
        hasMainnetRibbon={hasMainnetRibbon}
        hasTestnetRibbon={hasTestnetRibbon}
        setHasMainnetRibbon={setHasMainnetRibbon}
        setHasTestnetRibbon={setHasTestnetRibbon}
      />
      <NetworkNotificationModal
        activeNetwork={activeNetwork}
        hasMainnetNotificationModal={hasMainnetNotificationModal}
        hasTestnetNotificationModal={hasTestnetNotificationModal}
        setHasTestnetNotificationModal={setHasTestnetNotificationModal}
        setHasMainnetNotificationModal={setHasMainnetNotificationModal}
      />
    </div>
  )
}

export default NetworkHandler
