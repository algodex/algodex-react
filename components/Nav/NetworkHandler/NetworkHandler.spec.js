import { fireEvent, render } from 'test/test-utils'

import NetworkBanner from './NetworkBanner'
import NotificationModal from './NotificationModal'
import { matchers } from '@emotion/jest'
import useUserState from '@/store/use-user-state'

expect.extend(matchers)

describe('Network Banner Component', () => {
  it('Should render Banner for Testnet', () => {
    function NetworkBannerTest() {
      const setHasTestnetRibbon = useUserState((state) => state.setHasTestnetRibbon)
      setHasTestnetRibbon(true)
      return <NetworkBanner />
    }
    const { queryByTestId } = render(<NetworkBannerTest />)
    expect(queryByTestId('banner-container')).not.toBeNull()
    fireEvent.click(queryByTestId('banner-close-btn'))
    expect(queryByTestId('banner-container')).toBeNull()
  })

  it('Should render Banner for Mainnet', () => {
    function NetworkBannerTest() {
      const setActiveNetwork = useUserState((state) => state.setActiveNetwork)
      const setHasMainnetRibbon = useUserState((state) => state.setHasMainnetRibbon)
      setHasMainnetRibbon(true)
      setActiveNetwork('mainnet')
      return <NetworkBanner />
    }
    const { queryByTestId } = render(<NetworkBannerTest />)
    expect(queryByTestId('banner-container')).not.toBeNull()
    fireEvent.click(queryByTestId('banner-close-btn'))
    expect(queryByTestId('banner-container')).toBeNull()
  })
})

describe('Notification Modal Component', () => {
  it('Should render Network notification Modal', () => {
    const { queryByTestId } = render(
      <NotificationModal isModalActive={false} content={<div>Hello World</div>} />
    )
    expect(queryByTestId('notification-modal-wrapper')).toBeNull()
  })
  it('Should not render Network notification Modal', () => {
    const { queryByTestId } = render(
      <NotificationModal isModalActive={true} content={<div>Hello World</div>} />
    )
    expect(queryByTestId('notification-modal-wrapper')).not.toBeNull()
  })
})
