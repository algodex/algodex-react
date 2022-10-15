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

import Icon from '@mdi/react'
import { mdiWindowClose } from '@mdi/js'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { getActiveNetwork } from 'services/environment'
import { useCallback } from 'react'

const NetworkBanner = () => {
  const { t } = useTranslation('network-notification')

  const activeNetwork = getActiveNetwork()

  const hasMainnetRibbon = useUserStore((state) => state.hasMainnetRibbon)
  const hasTestnetRibbon = useUserStore((state) => state.hasTestnetRibbon)
  const setHasTestnetRibbon = useUserStore((state) => state.setHasTestnetRibbon)
  const setHasMainnetRibbon = useUserStore((state) => state.setHasMainnetRibbon)

  const closeRibbonFn = useCallback((bool) => {
    activeNetwork === 'testnet' && setHasTestnetRibbon(bool)
    activeNetwork === 'mainnet' && setHasMainnetRibbon(bool)
  }, [activeNetwork, setHasMainnetRibbon, setHasTestnetRibbon])

  return (
    <>
      {((hasMainnetRibbon && activeNetwork === 'mainnet') ||
        (hasTestnetRibbon && activeNetwork === 'testnet')) && (
        <div
          data-testid="banner-container"
          style={{
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
