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

import ButtonEl from './Button'
import React from 'react'
export default {
  title: '@algodex/components/Button',
  component: ButtonEl,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'third', 'none'],
      control: { type: 'radio' }
    },
    type: {
      options: ['button'],
      control: { type: 'radio' }
    }
  },
  args: {
    variant: 'primary',
    type: 'button',
    children: 'Storybook'
  }
}

//eslint-disable-next-line
export const Button = (props) => {
  return <ButtonEl {...props} />
}
