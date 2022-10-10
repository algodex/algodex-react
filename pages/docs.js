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
import Header from 'components/Nav/Header'
import { useUserStore } from '../store'

/**
 * Documentation Landing Page
 * @todo: Bring in the algodex docs
 * @returns {JSX.Element}
 * @constructor
 */
const DocsPage = () => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)

  return (
    <>
      <Head>
        <title>Docs | Algodex</title>
      </Head>
      <Header />
      <iframe
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        title="about"
        src={activeNetwork == 'mainnet' ? 'https://docs.algodex.com/' : 'https://docs.algodex.com/'}
      />
    </>
  )
}
export default DocsPage
