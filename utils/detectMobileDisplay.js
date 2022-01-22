export default function detectMobileDisplay() {
  if (typeof window === 'undefined') return false
  const match = window.matchMedia('(min-width: 996px)')

  return !match.matches
}
