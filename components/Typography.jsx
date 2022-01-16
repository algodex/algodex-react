import styled from 'styled-components'
import theme from 'theme'

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
export const Title = (props) => (
  <BaseComponent {...title} {...props}>
    {props.children}
  </BaseComponent>
)

export const HeaderLg = (props) => (
  <BaseComponent {...headerLg} {...props}>
    {props.children}
  </BaseComponent>
)

export const HeaderSm = (props) => (
  <BaseComponent {...headerSm} {...props}>
    {props.children}
  </BaseComponent>
)

export const HeaderCaps = (props) => (
  <BaseComponent {...headerCaps} {...props}>
    {props.children}
  </BaseComponent>
)

export const Subtitle = (props) => (
  <BaseComponent {...subtitle} {...props}>
    {props.children}
  </BaseComponent>
)

export const BodyCopyLg = (props) => (
  <BaseComponent {...bodyCopyLg} {...props}>
    {props.children}
  </BaseComponent>
)

export const BodyCopy = (props) => (
  <BaseComponent {...bodyCopy} {...props}>
    {props.children}
  </BaseComponent>
)

export const BodyCopySm = (props) => (
  <BaseComponent {...bodyCopySm} {...props}>
    {props.children}
  </BaseComponent>
)

export const BodyCopyTiny = (props) => (
  <BaseComponent {...bodyCopyTiny} {...props}>
    {props.children}
  </BaseComponent>
)

export const PreTitle = (props) => (
  <BaseComponent {...preTitle} {...props}>
    {props.children}
  </BaseComponent>
)

export const LabelLg = (props) => (
  <BaseComponent {...labelLg} {...props}>
    {props.children}
  </BaseComponent>
)

export const LabelMd = (props) => (
  <BaseComponent {...labelMd} {...props}>
    {props.children}
  </BaseComponent>
)

export const LabelSm = (props) => (
  <BaseComponent {...labelSm} {...props}>
    {props.children}
  </BaseComponent>
)

export const NavLabel = (props) => (
  <BaseComponent {...navLabel} {...props}>
    {props.children}
  </BaseComponent>
)
