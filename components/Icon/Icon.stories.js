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

/* eslint-disable */
import React from 'react'
import styled from '@emotion/styled'
import { Icon as Component, ICONS } from './Icon'
import * as Icons from 'react-feather'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['300']};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

const colors = ['blue', 'amber', 'green', 'gray', 'red']
const mapping = Object.keys(Icons).reduce((previousValue, next) => {
  previousValue[next] = next
  return previousValue
}, {})

export default {
  title: '@algodex/components/Icon',
  component: Component,
  parameters: { layout: 'fullscreen' },
  args: {
    use: 'algoLogo',
    size: 10,
    // color: 'gray'
  },
  argTypes: {
    use: {
      options: Object.keys(mapping),
      mapping: mapping,
      control: {
        type: 'select'
      }
    },
    rowHeight: {
      control: { type: 'range', min: 0, max: 100 }
    }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export const Icon = (args) => {
  return <Component {...args} />
}
