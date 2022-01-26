import NetworkBanner from './NetworkBanner'
import NetworkNotificationModal from './NetworkNotificationModal'
import { useUserStore } from '../../store'

const NetworkHandler = () => {
  const hasMainnetRibbon = useUserStore((state) => state.hasMainnetRibbon)
  const hasTestnetRibbon = useUserStore((state) => state.hasTestnetRibbon)
  const hasMainnetNotificationModal = useUserStore((state) => state.hasMainnetNotificationModal)
  const hasTestnetNotificationModal = useUserStore((state) => state.hasTestnetNotificationModal)
  const activeNetwork = useUserStore((state) => state.activeNetwork)

  const isRibbonActive = activeNetwork === 'testnet' ? hasTestnetRibbon : hasMainnetRibbon
  const isModalActive =
    activeNetwork === 'testnet' ? hasTestnetNotificationModal : hasMainnetNotificationModal

  return (
    <div>
      {isRibbonActive && <NetworkBanner />}
      {isModalActive && <NetworkNotificationModal />}
    </div>
  )
}

export default NetworkHandler
