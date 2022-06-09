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
