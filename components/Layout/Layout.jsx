import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash/lang'
import detectMobileDisplay from '@/utils/detectMobileDisplay'
import useDebounce from '@/hooks/useDebounce'
import Spinner from '@/components/Spinner'
import ServiceError from '@/components/ServiceError'

import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'
/**
 * Detect Mobile
 * @returns {unknown}
 */
function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(undefined)
  const debounceIsMobile = useDebounce(isMobile, 500)
  useEffect(() => {
    function handleResize() {
      setIsMobile(detectMobileDisplay())
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [debounceIsMobile])

  return isMobile
}

/**
 * @param {object} props Component Properties
 * @returns {JSX.Element}
 * @constructor
 */
export function Layout({ loading, error, offline, ...props }) {
  const isMobile = useMobileDetect()
  const isSizeDetected = !isUndefined(isMobile)
  const isLoading = (!isUndefined(loading) && loading) || !isSizeDetected
  const isError = !isUndefined(error) && error
  const isOffline = !isUndefined(offline) && offline

  if (isLoading) return <Spinner flex={true} />
  if (isError) return <ServiceError flex={true} size={10} message={'Something is up'} />
  if (isOffline) return <ServiceError flex={true} size={10} message={'You are offline!'} />
  if (isSizeDetected && isMobile) return <MobileLayout {...props} />
  // if (isSizeDetected && isMobile) return <div>Something went wrong!</div>
  if (isSizeDetected && !isMobile) return <DesktopLayout {...props} />
}
Layout.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  offline: PropTypes.bool,
  mobile: PropTypes.bool,
  asset: PropTypes.object,
  rowHeight: PropTypes.number,
  sidebarCollapsed: PropTypes.bool,
  onSidebarToggle: PropTypes.func,
  sidebarExpanded: PropTypes.bool,
  onSidebarExpand: PropTypes.func,
  controlsCollapsed: PropTypes.bool,
  controlsExpanded: PropTypes.bool,
  footerCollapsed: PropTypes.bool,
  children: PropTypes.any,
  components: PropTypes.shape({
    Controls: PropTypes.elementType,
    Sidebar: PropTypes.elementType,
    Footer: PropTypes.elementType,
    Content: PropTypes.elementType
  })
}
Layout.defaultProps = {
  rowHeight: 70,
  sidebarCollapsed: false,
  sidebarExpanded: false,
  controlsCollapsed: false,
  controlsExpanded: true,
  footerCollapsed: false
  // components: {
  //   Controls: DefaultControls,
  //   Footer: WalletTabs
  // }
}
export default Layout
