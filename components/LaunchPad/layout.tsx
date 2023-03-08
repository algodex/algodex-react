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

import React, { ReactNode } from 'react'
import BottomNavigation from './Nav/BottomNavigation'
import LaunchpadDrawer from './Nav/Drawer'
import Header from 'components/Nav/Header'

// MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'

export const LaunchpadLayout = ({ children }: { children: ReactNode }) => {
  const drawerWidth = 250
  const toolbarHeight = 90
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ backgroundColor: 'gray.150', minHeight: '100%' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header />
      </AppBar>
      <Box sx={{ display: 'flex', flex: 1, overflow: 'auto', height: '100%' }}>
        {
          // Show the Desktop Drawer
          !isMobile && (
            <LaunchpadDrawer offset={toolbarHeight} width={drawerWidth} isMobile={isMobile} />
          )
        }
        <Box
          sx={{
            backgroundColor: 'gray.550',
            width: isMobile ? '100%' : `calc(100% - (${drawerWidth}px + 30%))`,
            maxWidth: isMobile ? '100%' : `calc(100% - (${drawerWidth}px + 30%)) !important`,
            marginInline: 'auto',
            minHeight: '100vh',
            paddingInline: '50px',
            paddingBlock: `${toolbarHeight + 15}px ${toolbarHeight - 20}px`,
            '@media(min-width:900px) and (max-width:1120px)': {
              width: `calc(100% - (${drawerWidth}px + 15%))`,
              maxWidth: `calc(100% - (${drawerWidth}px + 15%)) !important`
            },
            '@media(max-width:500px)': {
              paddingInline: '30px',
              paddingBlock: `${toolbarHeight + 10}px`
            }
          }}
        >
          {children}
        </Box>
      </Box>
      {isMobile && <BottomNavigation />}
    </Box>
  )
}
