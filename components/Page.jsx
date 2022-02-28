import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '@/components/Nav/Header'
import NetworkHandler from '@/components/Nav/NetworkHandler'
import Layout from '@/components/Layout/OriginalLayout'
import Spinner from '@/components/Spinner'
import { useExplorerAssetInfo } from '@/hooks/useAlgoExplorer'
import useUserStore from '@/store/use-user-state'

const DEBUG = process.env.NEXT_PUBLIC_DEBUG

const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: scroll;
  max-height: 100vh;
  height: 100%;
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
    <Container data-testid="page-layout">
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
