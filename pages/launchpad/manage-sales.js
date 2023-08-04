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

import Head from 'next/head'
import React from 'react'
import { LaunchpadLayout } from '@/components/LaunchPad/layout'
import { ManageTokenSale } from '@/components/LaunchPad/Sale/ManageTokenSale'

const ManageSalesPage = () => {
  return (
    <>
      <Head>
        <title>Launchpad | Manage Sales</title>
      </Head>
      <ManageTokenSale/>
    </>
  )
}

export default ManageSalesPage

ManageSalesPage.getLayout = function getLayout(page) {
  return <LaunchpadLayout>{page}</LaunchpadLayout>
}