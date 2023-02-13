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

/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { forwardRef, ReactNode, useMemo } from 'react'
import { useRouter } from 'next/router'

// MUI Components
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

// Custom Components
import CustomLink from '@/components/Nav/Link'

function ListItemLink({
  icon,
  primary,
  to,
  iconStyles,
  textStyles,
  wrapperStyles,
  ...res
}: {
  icon: ReactNode
  primary: string
  to: string
  textStyles?: object
  wrapperStyles?: object
  iconStyles?: object
}) {
  const router = useRouter()
  const activeNav = router.asPath

  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        const props = { href: to, sx: wrapperStyles }
        return (
          <CustomLink
            ref={ref}
            {...itemProps}
            // role={undefined}
            {...res}
            {...props}
          />
        )
      }),
    [to, res, wrapperStyles]
  )

  return (
    <li>
      <ListItem button component={renderLink} selected={activeNav === to}>
        {icon ? <ListItemIcon sx={iconStyles}>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} sx={textStyles} />
      </ListItem>
    </li>
  )
}

export default ListItemLink
