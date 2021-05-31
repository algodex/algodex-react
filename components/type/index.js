/* eslint-disable react/prop-types */
import BaseComponent from './base'
import theme from '../../theme'

const {
  title,
  headerLg,
  headerSm,
  subtitle,
  bodyCopyLg,
  bodyCopy,
  bodyCopySm,
  preTitle,
  labelLg,
  labelMd,
  labelSm,
  navLabel
} = theme.textStyles

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
