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
  const country = request.geo.country || 'GB'

  if (
    // Mainnet check
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' &&
    // Blocked country check
    BLOCKED_COUNTRIES.includes(country)
  ) {
    url.pathname = `/restricted/${country}`
    return NextResponse.redirect(url)
  }
}
