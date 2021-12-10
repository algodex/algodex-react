import { useEffect, useState } from 'react'

import Head from 'next/head'
import Header from 'components/header'
import MainLayout from 'components/main-layout'
import PropTypes from 'prop-types'
import Spinner from 'components/spinner'
import styled from 'styled-components'
import { useExplorerAssetInfo } from 'hooks/useAlgoExplorer'
import { useRouter } from 'next/router'
import useUserStore from 'store/use-user-state'

const DEBUG = process.env.NEXT_DEBUG

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: 100%;
  height: 100%;

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }
`

/**
 * Page Component
 *
 * @param {string} title
 * @param {string} description
 * @param {Object} staticExplorerAsset
 * @param {boolean} noFollow
 * @param {JSX.Element|JSX.Element[]} children
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
    id: query.id || explorerAsset?.id,
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
      <MainLayout asset={explorerAsset}>
        {(isLoading || !explorerAsset?.id) && <Spinner flex />}
        {!isLoading && explorerAsset?.id && children({ asset: explorerAsset })}
      </MainLayout>
    </Container>
  )
}
Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  staticExplorerAsset: PropTypes.object,
  noFollow: PropTypes.bool,
  children: PropTypes.func
}
export default Page
