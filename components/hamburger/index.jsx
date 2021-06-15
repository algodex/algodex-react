import { motion } from 'framer-motion'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledMotionSvg = styled(motion.svg)`
  cursor: pointer;
  @media (min-width: 1024px) {
    display: none;
  }
`

function Hamburger({ isOpen }) {
  const width = 24
  const height = 15
  const strokeWidth = 2
  const color = '#F8FAFC'
  const transition = null
  const variant = isOpen ? 'opened' : 'closed'

  const top = {
    closed: {
      rotate: 0,
      translateY: 0
    },
    opened: {
      rotate: 45,
      translateY: 2
    }
  }
  const center = {
    closed: {
      opacity: 1
    },
    opened: {
      opacity: 0
    }
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0
    },
    opened: {
      rotate: -45,
      translateY: -2
    }
  }
  const lineProps = {
    stroke: color,
    strokeWidth: strokeWidth,
    vectorEffect: 'non-scaling-stroke',
    initial: 'closed',
    animate: variant,
    transition
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * width) / height

  return (
    <StyledMotionSvg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
    >
      <motion.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
    </StyledMotionSvg>
  )
}

export default Hamburger

Hamburger.propTypes = {
  isOpen: PropTypes.bool
}

Hamburger.defaultProps = {
  isOpen: false
}
