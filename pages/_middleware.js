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
  const to = `/restricted/${country}`
  if (
    // process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' &&
    BLOCKED_COUNTRIES.includes(country) &&
    url.pathname !== to
  ) {
    url.pathname = to
    return NextResponse.redirect(url)
  }
}
