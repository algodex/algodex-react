/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as React from 'react'

// MUI Components
import MUIDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'

//Iconify
import { Icon } from '@iconify/react'

// Custom MUI Components
import ListItemLink from '@/components/Nav/ListItemLink'
import Typography from '@mui/material/Typography'

const styles = {
  linkWrapper: {
    opacity: 0.6,
    paddingBlock: '12px !important',
    '&:hover': {
      opacity: 0.8
    },
    '&.active': {
      opacity: 1,
      position: 'relative',
      '&:before': {
        position: 'absolute',
        left: 0,
        content: '""',
        backgroundColor: 'white',
        height: '100%',
        width: '4px'
      }
    }
  },
  text: {
    color: 'white',
    ['.MuiListItemText-primary']: {
      fontWeight: 700,
      fontSize: '16px'
    }
  },
  icon: {
    color: 'white'
  },
  iconWrapper: {
    minWidth: '43px'
  }
}

function LaunchpadDrawer({
  width,
  offset,
  isMobile,
  ...props
}: {
  width: number
  offset: number
  isMobile: boolean
}) {
  return (
    <MUIDrawer
      variant="permanent"
      anchor="left"
      open={!isMobile}
      sx={{
        width: !isMobile ? width : 0,
        flexShrink: 0,
        ['& .MuiDrawer-paper']: {
          width,
          boxSizing: 'border-box'
          // backgroundColor: 'background.default',
        }
      }}
      {...props}
    >
      <Toolbar sx={{ height: offset }} />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemLink
            to="/launchpad/create-token"
            icon={
              <Icon
                icon="material-symbols:add-circle-outline-rounded"
                style={styles.icon}
                fontSize={'22px'}
              />
            }
            primary={'Create Token'}
            textStyles={styles.text}
            wrapperStyles={styles.linkWrapper}
            iconStyles={styles.iconWrapper}
          />
          <ListItemLink
            to="/launchpad/manage-token"
            icon={<Icon icon="icon-park-solid:setting" style={styles.icon} fontSize={'22px'} />}
            primary={'Manage Token'}
            textStyles={styles.text}
            wrapperStyles={styles.linkWrapper}
            iconStyles={styles.iconWrapper}
          />
          <Divider sx={{ backgroundColor: 'gray.250', margin: '20px 10px' }} />

          <ListItemLink
            to="/launchpad/create-sales"
            icon={<Icon icon="ri:money-dollar-circle-line" style={styles.icon} fontSize={'23px'} />}
            primary={'Create Token Sale'}
            textStyles={styles.text}
            wrapperStyles={styles.linkWrapper}
            iconStyles={styles.iconWrapper}
          />
          <ListItemLink
            to="/launchpad/manage-sales"
            icon={<Icon icon="bxs:badge-dollar" style={styles.icon} fontSize={'23px'} />}
            primary={'Manage Token Sale'}
            textStyles={styles.text}
            wrapperStyles={styles.linkWrapper}
            iconStyles={styles.iconWrapper}
          />

          <Divider sx={{ backgroundColor: 'gray.250', margin: '20px 10px' }} />
          <ListItemLink
            to="https://mailbox-testnet.algodex.com/"
            icon={<Icon icon="fa:send" style={styles.icon} fontSize={'20px'} />}
            primary={'Distribute Token'}
            textStyles={styles.text}
            wrapperStyles={{ ...styles.linkWrapper, paddingBottom: '0 !important' }}
            iconStyles={styles.iconWrapper}
          />
          <Typography
            sx={{
              ...styles.text,
              fontSize: '12px',
              fontStyle: 'italic',
              px: '60px',
              opacity: 0.4,
              cursor:'default'
            }}
          >
            with Algodex Mailbox
          </Typography>
        </List>
      </Box>
    </MUIDrawer>
  )
}
export default LaunchpadDrawer
