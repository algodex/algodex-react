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

import { NextResponse } from 'next/server'

/**
 * GeoIP blocking middleware
 *
 * @param {NextRequest} request
 * @returns {NextResponse}
 */
export function middleware(request) {
  const url = new URL(request.url)
  const country = request.geo.country || 'GB'

  // Check for if this is the appropriate page
  if (
    // Make sure search params exists
    typeof url.searchParams !== 'undefined' &&
    // Check Search Params for any queries
    Array.from(url.searchParams).length === 0 &&
    // Make sure we are not rewriting static assets
    !url.pathname.match(/(.svg|.ico)/) &&
    // Check if the Country Code is empty
    url.searchParams.get('cc') === null
  ) {
    // Append the Country Code and redirect to the same page
    url.searchParams.append('cc', country)
    return NextResponse.redirect(url)
  }

  // Someone attempting to change the query to bypass the block
  if (
    // Make sure search params exists
    typeof url.searchParams !== 'undefined' &&
    // Check if the user has modified the search parameter
    url.searchParams.get('cc') !== country
  ) {
    // Append the Country Code and redirect to the same page
    url.searchParams.set('cc', country)
    return NextResponse.redirect(url)
  }
}
