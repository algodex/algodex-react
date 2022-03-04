import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Header from '@/components/Nav/Header'
import Layout from '@/components/Layout/OriginalLayout'
import NetworkHandler from '@/components/Nav/NetworkHandler'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import styled from '@emotion/styled'
import theme from '../theme/index'
import { useExplorerAssetInfo } from '@/hooks/useAlgoExplorer'
import { useRouter } from 'next/router'
import useUserStore from '@/store/use-user-state'

const DEBUG = process.env.NEXT_PUBLIC_DEBUG

const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: 100%;
  height: 100%;

  @media (min-width: 996px) {
    overflow-y: scroll;
    max-height: none;
    border-bottom: solid 6px ${theme.palette.gray['700']};
  }
`

/**
 * Page Component
 *
 * @param {string} title
 * @param {string} description
 * @param {Object} staticExplorerAsset
 * @param {boolean} noFollow
 * @param {JSX.Element|JSX.Element[]|function} children
 * @returns {JSX.Element}
 * @constructor
 */
const Page = ({
  title = 'Algodex | Decentralized Algorand Exchange',
  description = 'Decentralized exchange for trading Algorand ASAs',
  staticExplorerAsset,
  noFollow = false,
  children
}) => {
  const { query, isFallback } = useRouter()
  const [explorerAsset, setExplorerAsset] = useState(staticExplorerAsset)

  const id = parseInt(query.id)
  const isRouted = typeof query.id !== 'undefined'
  const isShallow = isRouted && id !== explorerAsset?.id
  const isStatic = isRouted && id === staticExplorerAsset?.id

  DEBUG &&
    console.debug(`Page Render: ${staticExplorerAsset?.id || 'Missing'}`, {
      isRouted,
      isShallow,
      isStatic,
      isFallback
    })

  // Add Asset to User Storage
  const addAsset = useUserStore((state) => state.addAsset)

  let options = {
    enabled: isRouted || isShallow,
    refetchInterval: 200000
  }

  if (isStatic) {
    options.initialData = staticExplorerAsset
  }

  const { data, isLoading } = useExplorerAssetInfo({
    asset: { id: query.id || explorerAsset?.id },
    options
  })

  useEffect(() => {
    if (
      typeof data !== 'undefined' &&
      typeof data.id !== 'undefined' &&
      data.id !== explorerAsset?.id
    ) {
      addAsset(data)
      setExplorerAsset(data)
    }
  }, [explorerAsset, addAsset, data])

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
        {noFollow && <meta name="robots" content="noindex,nofollow" />}
      </Head>
      <Header />
      <NetworkHandler />
      <Layout asset={explorerAsset}>
        {(isLoading || !explorerAsset?.id) && <Spinner flex />}
        {!isLoading && explorerAsset?.id && children({ asset: explorerAsset })}
      </Layout>
    </Container>
  )
}
Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  staticExplorerAsset: PropTypes.object,
  noFollow: PropTypes.bool,
  children: PropTypes.node
}
export default Page
