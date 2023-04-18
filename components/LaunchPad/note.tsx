import React from 'react'

//MUI Components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import { ServiceIcon } from './copyIcon'

import Tooltip from '@mui/material'

import AlgoSvg from 'public/algorand-algo-logo.svg'
import Icon from 'components/Icon'

import { styles } from './styles.css'
import Divider from '@mui/material/Divider'
import { Container } from '@mui/material'

export const Note = ({
  className,
  sx,
  content
}: {
  className?: string
  sx?: object
  content: string
}) => {
  return (
    <Box
      className={`flex p-3 ${className}`}
      sx={{
        backgroundColor: 'rgba(56, 161, 105, 0.2)',
        border: 1,
        borderColor: 'green.500',
        borderRadius: '3px',
        columnGap: '4px',
        ...sx
      }}
    >
      <InfoOutlinedIcon sx={{ color: 'white', fontSize: '16px', ml: '5px' }} />

      <Typography sx={{ fontWeight: 500, fontSize: '12px', color: 'white' }}>{content}</Typography>
    </Box>
  )
}

export const ServiceFeeNote = ({ sx, fee }: { sx?: object; fee: number }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(171, 179, 188, 0.2)',
        border: ' 2px solid #ABB3BC',

        width: '481px',
        height: '97px',
        borderRadius: '3px',
        columnGap: '4px',
        marginBottom: '31px',
        marginLeft: 'auto',
        marginRight: 'auto',

        ...sx
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(4, 24px)',
          gridTemplateColumns: 'repeat(24, 1fr)'
        }}
      >
        <InfoOutlinedIcon
          sx={{
            color: 'white',
            fontSize: '16px',
            gridColumn: '2 / 3',
            // marginBottom: '20px',
            marginTop: '15px',
            gridRow: '1 / 2',
            alignSelf: 'center'
          }}
        />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '3 / 10',
            gridRow: '1 / 2',
            marginTop: '15px',

            marginLeft: '5px',
            alignSelf: 'center'
          }}
        >
          Cost to Mint
        </Typography>
        <Typography
          sx={{
            backgroundColor: 'white',
            height: '1px',
            width: '115px',
            gridColumn: '8 / 12',
            marginTop: '15px',
            gridRow: '1 / 2',
            alignSelf: 'center'
          }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '13 / 14',
            gridRow: '1 / 2',
            marginTop: '15px',

            marginLeft: '5px',
            alignSelf: 'center'
          }}
        >
          {fee}
        </Typography>

        <Box sx={{ gridColumn: '14 / 15', gridRow: '1 / 2', marginTop: '7px', marginLeft: '3px' }}>
          <Image src={AlgoSvg} width="8px" height="8px" alt="AlgoSvg" />
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '16 / 20',
            gridRow: '1 / 2',
            marginTop: '15px',

            alignSelf: 'center'
          }}
        >
          Service Fee
        </Typography>
        <ServiceIcon
          content="Holding 10,000 ALGX waives the 1000 ALGO service fee"
          sx={{
            color: 'white',
            fontSize: '11px',
            gridColumn: '20 / 21',
            // marginBottom: '20px',
            gridRow: '1 / 2',
            marginTop: '15px',
            marginLeft: '3px',

            alignSelf: 'center'
          }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '13 / 14',
            gridRow: '2 / 3',
            marginLeft: '5px',
            alignSelf: 'end',
            marginTop: '3px'
          }}
        >
          .001
        </Typography>

        <Box sx={{ gridColumn: '14 / 15', gridRow: '2 / 3', marginTop: '3px' }}>
          <Image
            className="hidden justify-self-start md:block max-w-[224px] max-h-[168px] mt-3"
            src={AlgoSvg}
            width="8px"
            height="8px"
            alt="AlgoSvg"
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '16 / 22',
            gridRow: '2 / 3',
            marginTop: '3px',
            alignSelf: 'end'
          }}
        >
          Transaction Fee
        </Typography>

        <ServiceIcon
          sx={{
            color: 'white',
            fontSize: '11px',
            gridColumn: '21/22',
            marginBottom: '2px',
            marginLeft: '11px',
            gridRow: '2 / 3',
            alignSelf: 'end'
          }}
          content=".001 ALGO is the fee for sending the transaction to the Algorand blockchain to create or edit the token."
        />

        <Typography
          sx={{
            backgroundColor: 'white',
            height: '1px',
            width: '200px',
            gridColumn: '12 / 24',
            gridRow: '3 / 4',
            marginTop: '9px'
          }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '8/ 14',
            gridRow: '4 ',
            marginBottom: '14px',
            alignSelf: 'center'
          }}
        >
          Total to Mint Token:
        </Typography>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '13 / 16',
            gridRow: '4',
            marginBottom: '14px',

            alignSelf: 'center'
          }}
        >
          {fee + 0.001}
        </Typography>

        <Box sx={{ gridColumn: '15/ 16', gridRow: '3/ 4', marginLeft: '3px', marginTop: '15px' }}>
          <Image src={AlgoSvg} width="8px" height="8px" alt="AlgoSvg" />
        </Box>
      </Box>
    </Box>
  )
}
