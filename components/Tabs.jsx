import MUITabs from '@mui/material/Tabs'
import { styled } from '@mui/system'

const Tabs = styled(MUITabs)`
  border-bottom: solid 1px ${({ theme }) => theme.colors.gray['700']};

  .MuiTabs-indicator {
    min-width: 50px;
    height: 5px;
    background-color: ${({ tabType, theme }) =>
      tabType === 'buy' ? theme.colors.green['500'] : theme.colors.red['500']};
  }
  .MuiTab-textColorPrimary {
    &:hover {
      color: #fff;
    }
  }
`

export default Tabs
