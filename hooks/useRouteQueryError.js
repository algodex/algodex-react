/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import useUserStore from 'store/use-user-state'

/**
 * Route based on Error
 * @param isError
 * @param error
 * @param router
 * @returns {function(): boolean}
 */
export const useRouteQueryError = ({ isError, error, router, enabled = true }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  if (enabled) {
    if (isError && error.message.match(404)) {
      router.push('/404')
    } else if (isError && error.message.match(500)) {
      // Do nothing. The component will handle this.
    } else if (isError && error.message.match(451) && activeNetwork === 'mainnet') {
      console.error({ error })
      router.push('/restricted/US')
    }
  }
}

export default useRouteQueryError
