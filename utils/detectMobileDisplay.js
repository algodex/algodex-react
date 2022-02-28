export default function detectMobileDisplay() {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return false
  const match = window.matchMedia('(min-width: 1023px)')

  return !match.matches
}
