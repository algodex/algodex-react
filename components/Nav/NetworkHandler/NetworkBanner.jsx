import Icon from '@mdi/react'
import { mdiWindowClose } from '@mdi/js'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'

const NetworkBanner = () => {
  const { t } = useTranslation('network-notification')

  const activeNetwork = useUserStore((state) => state.activeNetwork)

  const hasMainnetRibbon = useUserStore((state) => state.hasMainnetRibbon)
  const hasTestnetRibbon = useUserStore((state) => state.hasTestnetRibbon)
  const setHasTestnetRibbon = useUserStore((state) => state.setHasTestnetRibbon)
  const setHasMainnetRibbon = useUserStore((state) => state.setHasMainnetRibbon)

  const closeRibbonFn = (bool) => {
    activeNetwork === 'testnet' && setHasTestnetRibbon(bool)
    activeNetwork === 'mainnet' && setHasMainnetRibbon(bool)
  }

  return (
    <>
      {((hasMainnetRibbon && activeNetwork === 'mainnet') ||
        (hasTestnetRibbon && activeNetwork === 'testnet')) && (
        <div
          data-testid="banner-container"
          style={{
            padding: '0.8rem 0',
            background: `${
              activeNetwork == 'mainnet' ? theme.palette.blue['500'] : theme.palette.green['500']
            }`
          }}
          className="flex items-center justify-between"
        >
          <p
            style={{
              width: '90%',
              color: '#FFFFFF'
            }}
            data-testid="banner-message"
            className="flex justify-center font-medium xs:ml-2 xs:mr-2 xs:text-xs xs:text-center lg:text-sm"
          >
            {activeNetwork == 'mainnet' ? t('ribbon-message-mainnet') : t('ribbon-message-testnet')}
          </p>
          <Icon
            data-testid="banner-close-btn"
            onClick={() => closeRibbonFn(false)}
            path={mdiWindowClose}
            title="Close ribbon"
            size={1}
            className="xs:mr-2 lg:mr-8 cursor-pointer"
            color="#FFFFFF"
          />
        </div>
      )}
    </>
  )
}

export default NetworkBanner
