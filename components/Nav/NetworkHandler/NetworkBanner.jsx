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

import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material'
import { getActiveNetwork } from 'services/environment'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'

const NetworkBanner = () => {
  const { t } = useTranslation('network-notification')

  const activeNetwork = getActiveNetwork()

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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
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
            <CloseIcon
              data-testid="banner-close-btn"
              sx={{
                color: "#FFFFFF"
              }}
              onClick={() => closeRibbonFn(false)}
              className="xs:mr-2 lg:mr-8 cursor-pointer"
            />
          </Stack>
        )}
    </>
  )
}

export default NetworkBanner
