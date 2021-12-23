import NetworkBanner from './NetworkBanner'
import NetworkNotification from './NetworkNotificationModal'
import useUserStore from 'store/use-user-state'

const NetworkHandler = () => {
  const {
    hasMainnetRibbon,
    hasTestnetRibbon,
    activeNetwork,
    hasMainnetNotificationModal,
    hasTestnetNotificationModal,
    setHasMainnetRibbon,
    setHasTestnetRibbon,
    setHasMainnetNotificationModal,
    setHasTestnetNotificationModal
  } = useUserStore((state) => state)

  return (
    <>
      <NetworkBanner
        activeNetwork={activeNetwork}
        hasMainnetRibbon={hasMainnetRibbon}
        hasTestnetRibbon={hasTestnetRibbon}
        setHasMainnetRibbon={setHasMainnetRibbon}
        setHasTestnetRibbon={setHasTestnetRibbon}
      />
      <NetworkNotification
        activeNetwork={activeNetwork}
        hasMainnetNotificationModal={hasMainnetNotificationModal}
        hasTestnetNotificationModal={hasTestnetNotificationModal}
        setHasTestnetNotificationModal={setHasTestnetNotificationModal}
        setHasMainnetNotificationModal={setHasMainnetNotificationModal}
      />
    </>
  )
}

export default NetworkHandler
