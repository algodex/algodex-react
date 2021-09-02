import styled from 'styled-components'
import { rgba, lighten } from 'polished'
import Icon from 'components/icon'

export const InfoPopup = styled.aside`
  position: absolute;
  top: 100px;
  left: calc(320px + 1.125rem);
  width: ${({ isLarge }) => (isLarge ? '480px' : '360px')};
  background-color: ${({ theme }) => lighten(0.02, theme.colors.gray['800'])};
  z-index: 999;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transform: translateY(${({ isActive }) => (isActive ? '0' : '5%')});
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  padding: 1rem 1.5rem;
  padding-bottom: ${({ isLarge }) => (isLarge ? '0.25rem' : '1.25rem')};
  box-shadow: 3px 3px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};

  @media (min-width: 1536px) {
    top: ${({ searchHeight }) => `${searchHeight + 36}px`};
    left: calc(100% + 1.125rem);
  }
`

export const HeaderContainer = styled.div`
  h3 {
    > span {
      white-space: nowrap;

      svg {
        position: relative;
        top: -0.125rem;
        margin-left: 0.125rem;
      }
    }
  }
`

export const InfoList = styled.dl`
  display: flex;
  flex-wrap: wrap;
`

export const InfoItem = styled.div`
  flex: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};

  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`

export const Algos = styled(Icon)`
  position: relative;
  top: -0.125rem;
  margin-left: 0.125rem;
`

// this is imported by components/main-layout
export const ChartOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transition: opacity 150ms ease-in-out;
  z-index: 998;
`
