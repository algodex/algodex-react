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

import * as ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from '@/components/Nav/Link'
import VerifiedIcon from '@mui/icons-material/Verified';
import theme from 'theme'
import Icon from 'components/Icon'

const Container = styled.div`
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.palette.gray[900]};
  height: 100%;
  overflow: scroll;
  @media (min-width: 996px) {
    height: 34rem;
    // height: 100%;
  }
`

export function NFTView() {
  const NFTData = {
    imageUrl: '/NFTImage.png',
    asset: 'LYNX46',
    collection: {
      name: 'Algo Lynx',
      url: 'https://www.nftexplorer.app/asset/379313755',
      creator: 'Linx Digital Studio'
    },
    description: "The Algo Lynx Collection will be a set of 600 unique 1/1 NFTs. The collections will be made up of 550 Algo Lynxes uniquely designed by our team, 10 full body Lynxes based on Greek Mythology, and 40 special Lynxes based on current popular themes and multiple special collaborations with our favorite creators. Additionally we will have 1 Algo Lynx LE Card and 5 Algo Lynx Legendary Cards.",
    nftExplorerLink: "https://www.nftexplorer.app/collection/0xm",
    prices: {
      lastSalePrice: '275',
      avgSalePrice: '127.54',
      collectionAverage: '178.291',
    },
    currentHolderAddr: 'COFEAYYFGE6QH4ZEOKXCWRIIDJ7H5ZN2VI3EGCNDZNQYBMVXEJADRWUAA4',
    algoExplorerLink: 'https://algoexplorer.io/asset/379305572'
  }
  return (
    <Container>
      <Box>
        <Stack direction="row" alignItems="center">
          <Stack direction="row" alignItems="center" mr={8}>
            <VerifiedIcon sx={{ width: 18, height: 18, color: theme.colors.gray['000'] }} />&nbsp;
            <Typography variant="h6" fontWeight="bold" color={theme.colors.gray['000']}>{NFTData.asset}</Typography>
            <Typography variant="h6" color={theme.colors.gray['500']}>/ALGO</Typography>
          </Stack>
          <Button sx={{ backgroundColor: theme.colors.green['500'], width: '6rem', height: '1.5rem', marginRight: '1rem' }} variant="contained">
            <Typography variant="body_small_medium">IMAGE</Typography>
          </Button>
          <Button sx={{ width: '6rem', height: '1.5rem', border: '1px solid #718096', color: theme.colors.gray['000'] }} variant="outlined">
            <Typography variant="body_small_medium">CHART</Typography>
          </Button>
        </Stack>
        <Stack>
          <Typography variant='subtitle_medium' mt={1} fontWeight="500" color={theme.colors.gray['400']}>Collection: {NFTData.collection.name}</Typography>
          <Stack mb={1} direction="row" alignItems="center">
            <Typography variant='subtitle_medium' fontWeight="500" color={theme.colors.gray['400']}>
              Creator: {NFTData.collection.creator}
            </Typography>&nbsp;
            <VerifiedIcon style={{ width: 18, height: 18, color: '#A1AEC0' }} />
          </Stack>
        </Stack>
        {/* <Grid container spacing={2}> */}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* <Grid item xs={7}> */}
          <Grid item xs={12} sm={12} md={6}>
            <Image
              // style={{ borderRadius: '50%' }}
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
              <Box sx={{ border: '2px solid #FFFFFF', borderRadius: '3px', padding: '0.1rem' }} mr={1}>
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
              </Box>
            </Stack>
            <Box mt={3}>
              <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>Current Holder: T7J8...JK92</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant='subtitle_small_bold' sx={{ color: theme.colors.white }}>Algoexplorer</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

NFTView.propTypes = {}

NFTView.defaultProps = {}

export default NFTView
