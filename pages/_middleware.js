const BLOCKED_COUNTRIES = ['US', 'CA']
import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const country = request.geo.country || 'GB'
  if (BLOCKED_COUNTRIES.includes(country)) {
    url.pathname = '/restricted'
    return NextResponse.rewrite(url)
  }
}
