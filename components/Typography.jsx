import styled from '@emotion/styled'
import theme from '../theme/index'
import {
  space,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  color,
  system
} from 'styled-system'
import PropTypes from 'prop-types'

const {
  title,
  headerLg,
  headerSm,
  headerCaps,
  subtitle,
  bodyCopyLg,
  bodyCopy,
  bodyCopySm,
  bodyCopyTiny,
  preTitle,
  labelLg,
  labelMd,
  labelSm,
  navLabel
} = theme.textStyles

export const BaseComponent = styled.div`
  ${space}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${letterSpacing}
  ${textAlign}
  ${color}
  ${system({
    textTransform: true,
    cursor: true
  })}
`
const children = PropTypes.node

export const Title = (props) => (
  <BaseComponent {...title} {...props}>
    {props.children}
  </BaseComponent>
)
Title.propTypes = { children }

export const HeaderLg = (props) => (
  <BaseComponent {...headerLg} {...props}>
    {props.children}
  </BaseComponent>
)
HeaderLg.propTypes = { children }

export const HeaderSm = (props) => (
  <BaseComponent {...headerSm} {...props}>
    {props.children}
  </BaseComponent>
)
HeaderSm.propTypes = { children }
export const HeaderCaps = (props) => (
  <BaseComponent {...headerCaps} {...props}>
    {props.children}
  </BaseComponent>
)
HeaderCaps.propTypes = { children }
export const Subtitle = (props) => (
  <BaseComponent {...subtitle} {...props}>
    {props.children}
  </BaseComponent>
)
Subtitle.propTypes = { children }
export const BodyCopyLg = (props) => (
  <BaseComponent {...bodyCopyLg} {...props}>
    {props.children}
  </BaseComponent>
)
BodyCopyLg.propTypes = { children }
export const BodyCopy = (props) => (
  <BaseComponent {...bodyCopy} {...props}>
    {props.children}
  </BaseComponent>
)
BodyCopy.propTypes = { children }
export const BodyCopySm = (props) => (
  <BaseComponent {...bodyCopySm} {...props}>
    {props.children}
  </BaseComponent>
)
BodyCopySm.propTypes = { children }
export const BodyCopyTiny = (props) => (
  <BaseComponent {...bodyCopyTiny} {...props}>
    {props.children}
  </BaseComponent>
)
BodyCopyTiny.propTypes = { children }
export const PreTitle = (props) => (
  <BaseComponent {...preTitle} {...props}>
    {props.children}
  </BaseComponent>
)
PreTitle.propTypes = { children }
export const LabelLg = (props) => (
  <BaseComponent {...labelLg} {...props}>
    {props.children}
  </BaseComponent>
)
LabelLg.propTypes = { children }
export const LabelMd = (props) => (
  <BaseComponent {...labelMd} {...props}>
    {props.children}
  </BaseComponent>
)
LabelMd.propTypes = { children }
export const LabelSm = (props) => (
  <BaseComponent {...labelSm} {...props}>
    {props.children}
  </BaseComponent>
)
LabelSm.propTypes = { children }
export const NavLabel = (props) => (
  <BaseComponent {...navLabel} {...props}>
    {props.children}
  </BaseComponent>
)
NavLabel.propTypes = { children }

export const BrightGraySpan = styled.span`
  color: ${({ theme }) => theme.palette.gray['000']};
`
