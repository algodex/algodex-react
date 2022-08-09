import MUITab from '@mui/material/Tab'
import { styled } from '@mui/system'
import { tabUnstyledClasses } from '@mui/base/TabUnstyled'

export const Tab = styled(MUITab)`
  // color: ${({ theme }) => theme.colors.gray['500']};
  color: #fff;
  min-width: 55px;
  opacity: 0.5;
  padding: 0;
  display: flex;
  align-items: self-start;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.12rem;
  margin-right: 1rem;
  &.${tabUnstyledClasses.selected} {
    color: #fff;
    opacity: 1;
  }
`

export default Tab
