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

import React from 'react'
import { IconButton as Component } from './IconButton'
import styled from '@emotion/styled'
import * as Icons from 'react-feather'

const colors = ['blue', 'amber', 'green', 'gray', 'red']
const mapping = Object.keys(Icons).reduce((previousValue, next) => {
  previousValue[next] = next
  return previousValue
}, {})

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[200]};
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`
export default {
  title: '@algodex/components/Icon/Button',
  component: Component,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    color: {
      options: colors,
      control: { type: 'select' }
    },
    icon: {
      options: Object.keys(Icons),
      mapping: mapping,
      control: {
        type: 'select'
      }
    },
    gradient: { control: { type: 'range', min: 0, max: 900, step: 100 } },
    fillGradient: { control: { type: 'range', min: 0, max: 900, step: 100 } },
    size: { control: { type: 'range', min: 1, max: 1000 } }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />

export const Button = Template.bind({})
Button.args = {
  icon: 'Info',
  size: 500,
  onClick: () => console.log('Clicked')
}
