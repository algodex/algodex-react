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

import styled from '@emotion/styled'
import Head from 'next/head'
import Header from 'components/Nav/Header'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.dark};
  color: ${({ theme }) => theme.palette.gray['400']};
`

/**
 * 500 Error
 * TODO: Add in  <MainLayout/>
 * @returns {JSX.Element}
 * @constructor
 */
export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error</title>
      </Head>
      <Header />
      <Container>
        <h1>500 - Service Error</h1>
      </Container>
    </>
  )
}
