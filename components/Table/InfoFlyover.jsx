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

import PropTypes from 'prop-types'
import { isUndefined } from 'lodash/lang'

function InfoFlyover({ row, components, children, isActive }) {
  const { Root } = components

  const isChildren = isActive && !isUndefined(children)
  const isRow = !isChildren && Object.keys(row).length > 0
  const isEmpty = !isRow && !isChildren

  return (
    <Root>
      {isChildren && children}
      {isRow &&
        Object.keys(row).map((key, idx) => (
          <div color="blue" key={idx}>
            {key}: {row[key]}
          </div>
        ))}
      {isEmpty && <div data-testid="empty-flyover">Nothing Found!</div>}
    </Root>
  )
}

function DefaultRoot({ children }) {
  return <div>{children}</div>
}
DefaultRoot.propTypes = {
  children: PropTypes.any
}

InfoFlyover.propTypes = {
  row: PropTypes.object,
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),
  children: PropTypes.elementType,
  isActive: PropTypes.bool
}
InfoFlyover.defaultProps = {
  isActive: false,
  row: {},
  components: {
    Root: DefaultRoot
  }
}
export default InfoFlyover
