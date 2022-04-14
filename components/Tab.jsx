import MUITab from '@mui/material/Tab'
import { tabUnstyledClasses } from '@mui/base/TabUnstyled'
import { styled } from '@mui/system'

export const Tab = styled(MUITab)`
  color: ${({ theme }) => theme.colors.gray['500']};
  &.${tabUnstyledClasses.selected} {
    color: #fff;
  }
`

export default Tab
