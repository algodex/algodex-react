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

// SearchSidebar.stories.js
import { NavSearchSidebar as Component, default as ComponentWithData } from './SearchSidebar'
import { NavSearchTable as Table /*, default as LiveTable*/ } from './SearchTable'
import styled from '@emotion/styled'
import { ReactQueryDevtools } from 'react-query/devtools'
import React from 'react'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.palette.gray['800']};
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`
export default {
  title: '@algodex/recipes/Nav/Search Sidebar',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    isLive: false,
    query: '',
    components: { NavTable: Table },
    tableProps: {
      assets: [
        {
          change: '22.22',
          fullName: 'Lamps',
          hasBeenOrdered: true,
          id: 15322902,
          liquidityAlgo: '274056.448261',
          liquidityAsa: '28.217400',
          name: 'LAMP',
          price: '2200.0000',
          verified: false
        }
      ]
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

//eslint-disable-next-line
export const SearchSidebar = ({ query, isLive, ...rest }) => (
  <>
    {!isLive && <Component query={query} {...rest} />}
    {isLive && <ComponentWithData query={query} />}
    {isLive && <ReactQueryDevtools initialIsOpen={false} />}
  </>
)
