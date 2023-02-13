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

import { useRouter } from 'next/router'
import { useCallback } from 'react'

//Iconify
import { Icon } from '@iconify/react'

// MUI Components
import MUIBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'

const styles = {
  link: {
    borderRight: '1px solid',
    borderColor: 'gray.250',
    color: 'white',
    opacity: 0.6,
    '&.Mui-selected': {
      opacity: 1
    },
    ['.MuiBottomNavigationAction-label']: {
      fontWeight: 700,
      fontSize: '0.99rem'
    }
  },
  icon: {
    color: 'white'
  }
}

function BottomNavigation() {
  const router = useRouter()
  // activeNav is set when the application routes to a new page
  const activeNav = router.asPath

  // Default onChange behavior
  const _onChange = useCallback(
    (e, newValue) => {
      router.push(newValue)
    },
    [router]
  )

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <MUIBottomNavigation
        data-testid="menu-btn"
        // showLabels
        value={activeNav}
        onChange={_onChange}
        sx={{
          // backgroundColor: 'background.default',
          borderTop: '1px solid',
          borderColor: 'gray.250',
          color: 'gray.250'
        }}
      >
        <BottomNavigationAction
          value="/launchpad/create-token"
          // label={'Create Token'}
          sx={styles.link}
          icon={
            <Icon
              icon="material-symbols:add-circle-outline-rounded"
              style={styles.icon}
              fontSize={'25px'}
            />
          }
        />
        <BottomNavigationAction
          value="/launchpad/manage-token"
          // label={'Manage Token'}
          sx={styles.link}
          icon={
            <Icon
              icon="icon-park-solid:setting"
              style={styles.icon}
              fontSize={'25px'}
            />
          }
        />
        <BottomNavigationAction
          value="/launchpad/create-sales"
          // label={'Create Token Sales'}
          sx={styles.link}
          icon={
            <Icon
              icon="ri:money-dollar-circle-line"
              style={styles.icon}
              fontSize={'25px'}
            />
          }
        />
        <BottomNavigationAction
          value="/launchpad/manage-sales"
          // label={'Manage Token Sales'}
          sx={styles.link}
          icon={
            <Icon
              icon="bxs:badge-dollar"
              style={styles.icon}
              fontSize={'25px'}
            />
          }
        />
      </MUIBottomNavigation>
    </Paper>
  )
}

export default BottomNavigation
