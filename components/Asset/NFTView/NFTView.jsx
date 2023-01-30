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
import { Box, Button, Grid, Stack, Typography, TextField } from '@mui/material'
import Image from 'next/image'
import Link from '@/components/Nav/Link'
import VerifiedIcon from '@mui/icons-material/Verified';
import theme from 'theme'
import Icon from 'components/Icon'
import { withNFTDetailsQuery } from '../../../hooks'
import LaunchIcon from '@mui/icons-material/Launch';
import { truncatedWalletAddress } from 'components/helpers'
import { getActiveNetwork } from 'services/environment'

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
  const activeNetwork = getActiveNetwork()
  const algoURL = activeNetwork === 'testnet' ? `https://testnet.algoexplorer.io/asset/${nftDetails.id}` : `https://algoexplorer.io/asset/${nftDetails.id}`
  const NFTData = {
    imageUrl: `https://ipfs.algonft.tools/ipfs/${nftDetails.url}`,
    asset: nftDetails.name,
    collection: {
      name: nftDetails.fullName,
      url: `https://${nftDetails.verified_info?.url}`,
      creator: ''
    },
    description: nftDetails.verified_info?.description,
    // description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    nftExplorerLink: `https://www.nftexplorer.app/asset/${nftDetails.id}`,
    prices: {
      lastSalePrice: asset?.price_info?.price || 0,
      avgSalePrice: '',
      collectionAverage: '',
    },
    currentHolderAddr: nftDetails.txid,
    algoExplorerLink: algoURL
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" mr={8}>
              <VerifiedIcon sx={{ width: 18, height: 18, color: theme.colors.gray['000'] }} />&nbsp;
              <Typography variant="h6" fontWeight="bold" color={theme.colors.gray['000']}>{NFTData.asset}</Typography>
              <Typography variant="h6" color={theme.colors.gray['500']}>/ALGO</Typography>
            </Stack>
            <Box>
              <Button onClick={() => setActiveView('nft-image')} sx={{ backgroundColor: theme.colors.green['500'], width: '6rem', height: '1.5rem', marginRight: '1rem' }} variant="primary">
                <Typography variant="body_small_medium">IMAGE</Typography>
              </Button>
              {asset.isTraded && <Button onClick={() => setActiveView('chart')} sx={{ width: '6rem', height: '1.5rem', border: '1px solid #718096', color: theme.colors.gray['000'] }} variant="outlined">
                <Typography variant="body_small_medium">CHART</Typography>
              </Button>
              }
            </Box>

          </Stack>
          <Stack>
            <Typography variant='subtitle_medium' mb={1} mt={1} fontWeight="500" color={theme.colors.gray['400']}>Collection: {NFTData.collection.name}</Typography>
          </Stack>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* <Grid item xs={7}> */}
            <Grid item xs={12} sm={12} md={7}>
              <Box
                sx={{
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  width: '100%', 
                  height: `${containerSize.height - 118}px`,
                  backgroundImage: `url(${NFTData.imageUrl})`
                }}
              >
              </Box>
              <Box>
                <Stack direction="row">
                  <Typography mr={1} sx={{ color: theme.colors.white }} variant='body_small'>{asset.id}</Typography>
                  <Typography mr={1} sx={{ color: theme.colors.white }} variant='body_small'>1/1</Typography>
                  <Typography mr={1} sx={{ color: theme.colors.white }} variant='body_small_bold'>{NFTData.collection.name}</Typography>
                </Stack>
              </Box>
            </Grid>
            {/* <Grid item xs={5}> */}
            <Grid item xs={12} sm={12} md={5}>
              {NFTData.description && <Box sx={{
                border: '1px solid #FFFFFF',
                borderRadius: '3px',
                padding: '5px'
              }}>
                <Box>
                  <Typography variant='subtitle' sx={{ color: theme.colors.white }}>Collection Description:</Typography>
                </Box>
                <TextField
                  variant="outlined"
                  sx={{ 
                    width: '100%',
                    '.MuiOutlinedInput-root': {
                      padding: 0,
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 500
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'unset',
                    }
                  }}
                  value={NFTData.description}
                  multiline
                  maxRows={7}
                />
              </Box>
              }

              <Stack mt={3} direction="column" className='hey' justifyContent="center" alignItems="center">
                <Button variant='outlined' sx={{
                  border: '2px solid #FFFFFF',
                  borderRadius: '3px',
                  padding: '5px',
                  '&:hover': {
                    border: '2px solid #CBD5E0'
                  }
                }}>
                  <Stack direction="row" alignItems="center">
                    <Link href={NFTData.nftExplorerLink} data-testid="nft-url" className="flex">
                      <Typography variant='body_small_bold' sx={{ color: theme.colors.white }}>View Collection on NFTExplorer</Typography>&nbsp;
                      <LaunchIcon style={{ width: 18, height: 18, color: theme.colors.white }} />
                    </Link>
                  </Stack>
                </Button>
                <Stack direction="row" alignItems="center" justifyContent="center" mt={4}>
                  <Typography variant='subtitle' sx={{ color: theme.colors.gray['000'] }}>Last Sale Price</Typography>&nbsp;
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <Typography variant='subtitle' sx={{ color: theme.colors.white }}>{NFTData?.prices.lastSalePrice}</Typography>&nbsp;
                    <Icon color="gray" fillGradient={100} use="algoLogo" size={0.725} />
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" mt={4}>
                  <Typography variant='subtitle' sx={{ color: theme.colors.white }}>Current Holder: {truncatedWalletAddress(NFTData.currentHolderAddr, 4)}</Typography>
                </Stack>

                <Button variant='outlined' sx={{
                  border: '2px solid #FFFFFF',
                  borderRadius: '3px',
                  padding: '5px',
                  marginTop: '2rem',
                  '&:hover': {
                    border: '2px solid #CBD5E0'
                  }
                }}>
                  <Stack direction="row" alignItems="center">
                    <Link href={NFTData.algoExplorerLink} data-testid="nft-url" className="flex">
                      <Typography variant='body_small_bold' sx={{ color: theme.colors.white }}>
                        View Collection on AlgoExplorer
                      </Typography>&nbsp;
                      <LaunchIcon style={{ width: 18, height: 18, color: theme.colors.white }} />
                    </Link>
                  </Stack>
                </Button>
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
