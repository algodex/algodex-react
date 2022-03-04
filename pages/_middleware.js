const BLOCKED_COUNTRIES = ['US', 'CA']
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const country = request.geo.country || 'GB'
  if (
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' &&
    BLOCKED_COUNTRIES.includes(country) &&
    url.pathname !== '/restricted'
  ) {
    url.pathname = '/restricted'
    return NextResponse.redirect(url)
  }
}
