/*
 * Algodex Hooks
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
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

import {useState, useMemo} from 'react';

/**
 *
 * @param {Object} target
 * @param {string[]} keys
 * @return {object}
 */
function useWatch(target, keys) {
  // eslint-disable-next-line no-unused-vars
  const [__, updateChangeId] = useState(0);

  // useMemo to prevent unnecessary calls
  return useMemo(
      () => {
        const descriptor = keys.reduce((acc, key) => {
          const internalKey = `@@__${key}__`;

          acc[key] = {
            enumerable: true,
            configurable: true,
            get() {
              return target[internalKey];
            },
            set(value) {
              if (target[internalKey] !== value) {
                target[internalKey] = value;
                // <-- notify React about the change,
                updateChangeId((id) => id + 1);
              // the value's not important
              }
            },
          };
          return acc;
        }, {});

        return Object.defineProperties(target, descriptor);
      },

      [target, ...keys],
  );
}

export default useWatch;
