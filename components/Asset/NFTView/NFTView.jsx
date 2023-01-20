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
import PropTypes from 'prop-types'
import * as ReactDOM from 'react-dom'
import { useRef, useEffect, useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from '@/components/Nav/Link'
import VerifiedIcon from '@mui/icons-material/Verified';
import theme from 'theme'
import Icon from 'components/Icon'
import { withNFTDetailsQuery } from '../../../hooks'
import LaunchIcon from '@mui/icons-material/Launch';

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.gray[900]};
  height: 100%;
`
/**
 * Recipe: NFTView Component
 *
 * @todo: Return NFT Details Summary from API
 *
 * @param {object} props Component Properties
 * @param {object} props.asset Algorand Asset Information
 * @param {object} props.setActiveView Set active view
 * @param {object} props.activeView Holds active view
 * @returns {JSX.Element}
 * @constructor
 */
export function NFTView({ asset, setActiveView, activeView, ...props }) {
  const nftDetails = props
  const containerRef = useRef()
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const NFTData = {
    imageUrl: `https://ipfs.algonft.tools/ipfs/${nftDetails.url}`,
    asset: nftDetails.name,
    collection: {
      name: nftDetails.fullName,
      url: `https://${nftDetails.verified_info.url}`,
      creator: ''
    },
    description: nftDetails.verified_info.description,
    nftExplorerLink: `https://www.nftexplorer.app/asset/${nftDetails.id}`,
    prices: {
      lastSalePrice: asset.price_info.price,
      avgSalePrice: '',
      collectionAverage: '',
    },
    currentHolderAddr: nftDetails.txid,
    algoExplorerLink: `https://algoexplorer.io/asset/${nftDetails.id}`
  }

  useEffect(() => {
    const handleResize = () => {
      /**
       * Wait all the event queue process
       */
      setTimeout(() => {
        if (containerRef?.current) {
          const { width, height } = containerRef.current.getBoundingClientRect()
          setContainerSize({ width, height })
        }
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [containerRef])

  return useMemo(() => {
    return (
      <Container ref={containerRef} height={containerSize.height}>
        <Box
          className='overflow-y-scroll overflow-x-hidden'
          sx={{
            marginTop: '0.5rem',
            padding: '1rem',
            height: containerSize.height,
            backgroundColor: theme.palette.gray[900]
          }}
        >
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" mr={8}>
              <VerifiedIcon sx={{ width: 18, height: 18, color: theme.colors.gray['000'] }} />&nbsp;
              <Typography variant="h6" fontWeight="bold" color={theme.colors.gray['000']}>{NFTData.asset}</Typography>
              <Typography variant="h6" color={theme.colors.gray['500']}>/ALGO</Typography>
            </Stack>
            <Button onClick={() => setActiveView('nft-image')} sx={{ backgroundColor: theme.colors.green['500'], width: '6rem', height: '1.5rem', marginRight: '1rem' }} variant="primary">
              <Typography variant="body_small_medium">IMAGE</Typography>
            </Button>
            <Button onClick={() => setActiveView('chart')} sx={{ width: '6rem', height: '1.5rem', border: '1px solid #718096', color: theme.colors.gray['000'] }} variant="outlined">
              <Typography variant="body_small_medium">CHART</Typography>
            </Button>
          </Stack>
          <Stack>
            <Typography variant='subtitle_medium' mb={1} mt={1} fontWeight="500" color={theme.colors.gray['400']}>Collection: {NFTData.collection.name}</Typography>
            {/* <Stack mb={1} direction="row" alignItems="center">
              <Typography variant='subtitle_medium' fontWeight="500" color={theme.colors.gray['400']}>
                Creator: {NFTData.collection.creator}
              </Typography>&nbsp;
              <VerifiedIcon style={{ width: 18, height: 18, color: '#A1AEC0' }} />
            </Stack> */}
          </Stack>
          {/* <Grid container spacing={2}> */}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {/* <Grid item xs={7}> */}
            <Grid item xs={12} sm={12} md={6}>
              <Image
                src={NFTData.imageUrl}
                alt="NFT Name"
                width={1000}
                height={1000}
              />
            </Grid>
            {/* <Grid item xs={5}> */}
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <Typography variant='subtitle' sx={{ color: theme.colors.white }}>Collection Description:</Typography>
              </Box>
              <Box>
                <Typography variant='body_small' sx={{ color: theme.colors.white }}>
                  {NFTData.description}
                </Typography>
              </Box>
              <Box mt={3}>
                <Link href={NFTData.nftExplorerLink} data-testid="nft-url">
                  <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>View Collection on NFTExplorer</Typography>
                </Link>
              </Box>
              <Box mt={6}>
                <Typography variant='subtitle' sx={{ color: theme.colors.white }}>Sale Activity:</Typography>
              </Box>
              <Stack direction="row" alignItems="center">
                <Box sx={{ border: '2px solid #FFFFFF', borderRadius: '3px', padding: '0.1rem' }} mr={1}>
                  <Typography variant='body_tiny_bold' sx={{ color: theme.colors.gray['400'] }}>Last Sale Price</Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>{NFTData.prices.lastSalePrice}</Typography>&nbsp;
                    <Icon color="gray" fillGradient={100} use="algoLogo" size={0.725} />
                  </Stack>
                </Box>
                {/* <Box sx={{ border: '2px solid #FFFFFF', borderRadius: '3px', padding: '0.1rem' }} mr={1}>
                  <Typography variant='body_tiny_bold' sx={{ color: theme.colors.gray['400'] }}>Avg Sale Price</Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>{NFTData.prices.avgSalePrice}</Typography>&nbsp;
                    <Icon color="gray" fillGradient={100} use="algoLogo" size={0.725} />
                  </Stack>
                </Box>
                <Box sx={{ border: '2px solid #FFFFFF', borderRadius: '3px', padding: '0.1rem' }}>
                  <Typography variant='body_tiny_bold' sx={{ color: theme.colors.gray['400'] }}>Collection Avg</Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>{NFTData.prices.collectionAverage}</Typography>&nbsp;
                    <Icon color="gray" fillGradient={100} use="algoLogo" size={0.725} />
                  </Stack>
                </Box> */}
              </Stack>
              <Box mt={3}>
                <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>Current Holder: T7J8...JK92</Typography>
              </Box>
              <Stack mt={2} direction="row" alignItems="center">
                <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>
                  Algoexplorer
                </Typography>&nbsp;
                <LaunchIcon style={{ width: 18, height: 18, color: '#A1AEC0' }} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }, [containerSize])
}

NFTView.propTypes = {
  nftDetail: PropTypes.object,
  setActiveView: PropTypes.func,
  activeView: PropTypes.string,
  asset: PropTypes.object,

}

NFTView.defaultProps = {}

export default withNFTDetailsQuery(NFTView)
