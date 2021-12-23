import NotificationModal from 'components/network-notification'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'

const NetworkNotificationModal = ({
  activeNetwork,
  hasMainnetNotificationModal,
  hasTestnetNotificationModal,
  setHasTestnetNotificationModal,
  setHasMainnetNotificationModal
}) => {
  const { t } = useTranslation('network-notification')

  const closeModalFn = (bool) => {
    activeNetwork === 'testnet' && setHasTestnetNotificationModal(bool)
    activeNetwork === 'mainnet' && setHasMainnetNotificationModal(bool)
  }

  const modalMessages = useMemo(() => {
    if (activeNetwork == 'mainnet') {
      return {
        title: t('modal-title-mainnet'),
        subTitle: t('modal-subtitle-mainnet'),
        paragraphone: t('modal-first-paragraph-mainnet'),
        paragraphTwo: t('modal-second-paragraph-mainnet'),
        linkTextOne: t('modal-disclaimer'),
        linkTextTwo: t('modal-documentation'),
        linkAddressOne: 'https://about.algodex.com/disclaimers/',
        linkAddressTwo: 'https://about.algodex.com/docs/',
        button: t('modal-cta')
      }
    }
    if (activeNetwork == 'testnet') {
      return {
        title: t('modal-title-testnet'),
        subTitle: t('modal-subtitle-testnet'),
        paragraphone: t('modal-first-paragraph-testnet'),
        paragraphTwo: t('modal-second-paragraph-testnet'),
        linkTextOne: t('modal-faucet'),
        linkTextTwo: t('modal-documentation'),
        linkAddressOne: 'https://about.algodex.com/docs/',
        linkAddressTwo: 'https://about.algodex.com/docs/',
        button: t('modal-cta')
      }
    }
  }, [t, activeNetwork])

  return (
    <NotificationModal
      isModalActive={
        (activeNetwork === 'mainnet' && hasMainnetNotificationModal) ||
        (activeNetwork === 'testnet' && hasTestnetNotificationModal)
      }
      closeModal={() => closeModalFn(false)}
      content={modalMessages}
    />
  )
}

NetworkNotificationModal.propTypes = {
  activeNetwork: PropTypes.string,
  hasTestnetNotificationModal: PropTypes.bool,
  hasMainnetNotificationModal: PropTypes.bool,
  setHasTestnetNotificationModal: PropTypes.func,
  setHasMainnetNotificationModal: PropTypes.func
}
export default NetworkNotificationModal
