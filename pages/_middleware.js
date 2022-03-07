const BLOCKED_COUNTRIES = ['US', 'CA']
import { NextResponse } from 'next/server'

/**
 * GeoIP blocking middleware
 *
 * @param request
 * @returns {NextResponse}
 */
export function middleware(request) {
  const url = request.nextUrl.clone()
  const country = request.geo.country || 'US'
  const to = `/restricted/${country}`

  const matches = url.pathname.match(/svg|json|png|css|_next/g)
  const isStatic = typeof matches !== 'undefined' ? matches.length > 0 : false

  if (
    // Next loaders
    !isStatic &&
    // Not already on restricted
    url.pathname !== to &&
    // Mainnet check
    // process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' &&
    // Blocked country check
    BLOCKED_COUNTRIES.includes(country)
  ) {
    url.pathname = to
    return NextResponse.redirect(url)
  }
}
