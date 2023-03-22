import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

interface Props {
  children: React.ReactNode
}

const ClientOnly: React.FC<Props> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}

ClientOnly.propTypes = {
  children: PropTypes.node.isRequired
}
export default ClientOnly
