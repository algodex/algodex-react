import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from 'components/header'
import Icon from '@mdi/react'
import MainLayout from 'components/main-layout'
import { MainnetModalComp, TestnetModalComp } from 'components/helper-modals'
import PropTypes from 'prop-types'
import Spinner from 'components/spinner'
import { mdiWindowClose } from '@mdi/js'
import styled from 'styled-components'
import theme from '../theme'
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

export const Ribbon = styled.div`
  background: ;
  padding: 1rem 0;
  text-align: center;
`

export const Button = styled.button`
  width: 100%;
  background: white;
  color: black;
  padding: 9% 3%;
  border-radius: 3px;
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

  const { ribbonNotification, dexNetwork, modalNotification, activeNetwork } = useUserStore(
    (state) => state.dataForSwitchingNetwork
  )
  const setDataForSwitchingNetwork = useUserStore((state) => state.setDataForSwitchingNetwork)

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
      <div>
        {ribbonNotification && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.8rem 0',
              background: `${
                dexNetwork == 1 ? theme.colors.blue['500'] : theme.colors.green['500']
              }`
            }}
          >
            <p
              style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
              className="font-medium xs:ml-2 xs:mr-2 xs:text-xs xs:text-center lg:text-sm"
            >
              This is the
              {dexNetwork ? ' Mainet ' : ' Testnet '}
              version of Algodex. Please be careful making any trades.
            </p>
            <Icon
              onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
              path={mdiWindowClose}
              title="Close ribbon"
              size={1}
              className="xs:mr-2 lg:mr-8 cursor-pointer"
              color="#FFFFFF"
            />
          </div>
        )}
      </div>
      {activeNetwork == 'mainnet' ? (
        <MainnetModalComp
          modalNotification={modalNotification}
          setDataForSwitchingNetwork={setDataForSwitchingNetwork}
        />
      ) : (
        <TestnetModalComp
          modalNotification={modalNotification}
          setDataForSwitchingNetwork={setDataForSwitchingNetwork}
        />
      )}
      {/* <MainnetModalComp
        modalNotification={modalNotification}
        setDataForSwitchingNetwork={setDataForSwitchingNetwork}
      /> */}
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
