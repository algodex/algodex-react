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

import NotificationModal from 'components/Nav/NetworkHandler/NotificationModal'
import PropTypes from 'prop-types'
import { useMemo, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { getActiveNetwork } from 'services/environment'

const NetworkNotificationModal = () => {
  const { t } = useTranslation('network-notification')
  const activeNetwork = getActiveNetwork()

  const hasMainnetNotificationModal = useUserStore((state) => state.hasMainnetNotificationModal)
  const hasTestnetNotificationModal = useUserStore((state) => state.hasTestnetNotificationModal)
  const setHasTestnetNotificationModal = useUserStore(
    (state) => state.setHasTestnetNotificationModal
  )
  const setHasMainnetNotificationModal = useUserStore(
    (state) => state.setHasMainnetNotificationModal
  )

  const closeModalFn = useCallback((bool) => {
    activeNetwork === 'testnet' && setHasTestnetNotificationModal(bool)
    activeNetwork === 'mainnet' && setHasMainnetNotificationModal(bool)
  }, [activeNetwork, setHasMainnetNotificationModal, setHasTestnetNotificationModal])

  const modalMessages = useMemo(() => {
    if (activeNetwork == 'mainnet') {
      return {
        title: t('modal-title-mainnet'),
        subTitle: t('modal-subtitle-mainnet'),
        paragraphone: t('modal-first-paragraph-mainnet'),
        paragraphTwo: t('modal-second-paragraph-mainnet'),
        linkTextOne: t('modal-terms'),
        linkTextTwo: t('modal-documentation'),
        linkAddressOne: '/algodex_tos.pdf',
        linkAddressTwo: 'https://docs.algodex.com/',
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
        linkAddressOne: 'https://bank.testnet.algorand.network/',
        linkAddressTwo: 'https://docs.algodex.com/',
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
