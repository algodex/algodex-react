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

import { AlertIcon } from 'components/Icon'
import PropTypes from 'prop-types'
import { parseThemeColor } from 'theme'
import styled from '@emotion/styled'
import { useMemo } from 'react'

export const FlexContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Message = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  margin: ${({ flex }) => (flex ? '0.375rem 0' : '0 0 1rem 0')};
  color: ${({ color }) => {
    const split = color.split('.')
    const value = Number(split[1])
    if (value >= 300) {
      const str = [split[0], `${value - 200}`].join('.')
      return parseThemeColor(str)
    }
    return parseThemeColor('gray.000')
  }};
`

/**
 * Error Message
 *
 * @param {object} props Component Properties
 * @param {number} props.size <AlertIcon> Size
 * @param {string} props.color Component Color
 * @param {boolean} props.flex Enable Flex
 * @param {string} props.message Display Message
 * @param {JSXElement} props.Icon Icon Component to Render
 * @returns {JSX.Element}
 * @constructor
 */
export function ServiceError({ size, color, flex, message, Icon }) {
  const showMsg = useMemo(() => message?.length > 0, [message?.length])
  const serviceError = useMemo(() => flex ? (
    <FlexContainer data-testid="flex-service">
      <Icon size={size} color={color} />
      {showMsg && (
        <Message color={color} flex={flex}>
          {message}
        </Message>
      )}
    </FlexContainer>
  ) : (
    <Message data-testid="mssg-service" color={color} flex={flex}>
      <Icon size={size} color={color} />
      {message}
    </Message>
  ), [Icon, color, flex, message, showMsg, size])
  return serviceError
}

ServiceError.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  message: PropTypes.string,
  flex: PropTypes.bool,
  Icon: PropTypes.element
}

ServiceError.defaultProps = {
  size: 1.5,
  color: 'gray.600',
  flex: false,
  message: 'Something went wrong!',
  Icon: AlertIcon
}

export default ServiceError
