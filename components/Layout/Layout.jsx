import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import detectMobileDisplay from '../../utils/detectMobileDisplay'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import MobileLayout from '@/components/Layout/MobileLayout'
import useDebounce from 'hooks/useDebounce'
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

  return debounceIsMobile
}

/**
 * @param {object} props Component Properties
 * @returns {JSX.Element}
 * @constructor
 */
export function Layout(props) {
  const isMobile = useMobileDetect()
  return (
    <Fragment>
      {isMobile && <MobileLayout {...props} />}
      {!isMobile && <DesktopLayout {...props} />}
    </Fragment>
  )
}
Layout.propTypes = {
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
