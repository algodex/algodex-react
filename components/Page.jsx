import Head from 'next/head'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MainLayout from 'components/main-layout'
import Header from 'components/header'
import Spinner from 'components/spinner'
import useUserStore from 'store/use-user-state'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useExplorerAssetInfo } from 'hooks/AlgoExplorer'
const DEBUG = process.env.NEXT_DEBUG

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: calc(var(--vh, 1vh) * 100);
  height: calc(var(--vh, 1vh) * 100);

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }

  // for demo
  p.demo {
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray['600']};
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`

export const StatusContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
`

/**
 * Page Component
 *
 * @param {string} title
 * @param {string} description
 * @param {Object} staticExplorerAsset
 * @param {JSX.Element|JSX.Element[]} children
 * @returns {JSX.Element}
 * @constructor
 */
const Page = ({
  title = 'Algodex | Decentralized Algorand Exchange',
  description = 'Decentralized exchange for trading Algorand ASAs',
  staticExplorerAsset,
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
  children: PropTypes.any
}
export default Page
