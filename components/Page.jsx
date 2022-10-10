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

import Head from 'next/head'
import Header from '@/components/Nav/Header'
import NetworkHandler from '@/components/Nav/NetworkHandler'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import theme from '../theme/index'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: 100%;
  height: 100%;

  @media (min-width: 996px) {
    overflow-y: scroll;
    max-height: none;
    border-bottom: solid 6px ${theme.palette.gray['700']};
  }
`

/**
 * Page Component
 *
 * @param {string} title
 * @param {string} description
 * @param {Object} asset
 * @param {boolean} noFollow
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
const Page = ({
  title = 'Algodex | Decentralized Algorand Exchange',
  description = 'Decentralized exchange for trading Algorand ASAs',
  noFollow = false,
  children
}) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
        {noFollow && <meta name="robots" content="noindex,nofollow" />}
      </Head>
      <Header />
      <NetworkHandler />
      {children}
    </Container>
  )
}
Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  noFollow: PropTypes.bool,
  children: PropTypes.node
}
export default Page
