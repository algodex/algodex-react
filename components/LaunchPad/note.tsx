import React from 'react'

//MUI Components
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

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

export const ServiceFeeNote = ({
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
      // className={`flex p-3 ${className}`}
      sx={{
        backgroundColor: 'rgba(171, 179, 188, 0.2)',
        border: ' 2px solid #ABB3BC',

        // borderColor: 'green.500',
        width: '481px',
        height: '97px',
        borderRadius: '3px',
        columnGap: '4px',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        ...sx
      }}
    >
      {/* <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <InfoOutlinedIcon sx={{ color: 'white', fontSize: '16px', ml: '10px', mr: '10px' }} />
        <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'white', mr: '10px' }}>
          Cost to Mint
        </Typography>
        <Typography sx={{ backgroundColor: 'white', height: '1px', width: '115px' }} />
      </Box> */}

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(4, 1fr)',
          gridTemplateColumns: 'repeat(24, 1fr)'
        }}
      >
        <InfoOutlinedIcon
          sx={{
            color: 'white',
            fontSize: '16px',
            gridColumn: '2 / 3',
            // marginBottom: '20px',
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
            marginLeft: '5px',
            alignSelf: 'center'
          }}
        >
          1000
        </Typography>

        <Box sx={{ gridColumn: '14 / 15', gridRow: '1 / 2' }}>
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
            gridColumn: '16 / 20',
            gridRow: '1 / 2',
            alignSelf: 'center'
          }}
        >
          Service Fee
        </Typography>

        <HelpOutlineOutlinedIcon
          sx={{
            color: 'white',
            fontSize: '11px',
            gridColumn: '20 / 21',
            // marginBottom: '20px',
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
            gridRow: '2 / 3',
            marginLeft: '5px',
            alignSelf: 'center'
          }}
        >
          .001
        </Typography>

        <Box sx={{ gridColumn: '14 / 15', gridRow: '2 / 3' }}>
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
            alignSelf: 'center'
          }}
        >
          Transaction Fee
        </Typography>

        <HelpOutlineOutlinedIcon
          sx={{
            color: 'white',
            fontSize: '11px',
            gridColumn: '22',
            // marginBottom: '20px',
            gridRow: '2 / 3',
            alignSelf: 'center'
          }}
        />

        <Typography
          sx={{
            backgroundColor: 'white',
            height: '1px',
            width: '200px',
            gridColumn: '12 / 24',
            gridRow: '3 / 4'
          }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '12px',
            color: 'white',
            gridColumn: '6 / 12',
            gridRow: '4 ',
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

            alignSelf: 'center'
          }}
        >
          1000.001
        </Typography>

        <Box sx={{ gridColumn: '16 / 17', gridRow: '4' }}>
          <Image
            className="hidden justify-self-start md:block max-w-[224px] max-h-[168px] mt-3"
            src={AlgoSvg}
            width="8px"
            height="8px"
            alt="AlgoSvg"
          />
        </Box>
      </Box>
    </Box>
  )
}
