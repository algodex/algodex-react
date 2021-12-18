import { useEffect, useState } from 'react'
import Modal from 'components/Modal'
import Head from 'next/head'
import Header from 'components/header'
import Icon from '@mdi/react'
import MainLayout from 'components/main-layout'
import PropTypes from 'prop-types'
import Spinner from 'components/spinner'
import { mdiWindowClose, mdiTwitter, mdiReddit, mdiDiscord, mdiSend } from '@mdi/js'
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

  const { ribbonNotification, dexNetwork } = useUserStore((state) => state.dataForSwitchingNetwork)
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
      <Modal>
        <div className="flex flex-col justify-between text-white h-3/5 w-2/5 md:w-2/5 max-w-screen-lg bg-gray-600 rounded-lg p-8">
          <div className="flex flex-col justify-between h-4/5">
            <p className="text-2xl font-bold">Welcome to Algodex Testnet!</p>
            <p className="italic font-medium text-lg">Test new features risk free!</p>
            <p className="text-sm">
              You are trading on the Testnet version of Algodex used to test our new features and
              find bugs. All trades on Testnet use testnet algos and assets with no real value. You
              are able to get Algos to test with from the Faucet link below.
            </p>
            <p className="text-sm">Please send feedback about any bugs or feature requests!</p>
            <div className="w-1/2">
              <hr />
              <p className="text-2xl my-2 italic font-medium">Faucet</p>
              <hr />
              <p className="text-2xl my-2 italic font-medium">Documentation</p>
              <hr />
              <div className="flex mt-4 mx-2 w-1/4">
                <div className="flex items-center">
                  <Icon
                    onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                    path={mdiSend}
                    title="Telegram link"
                    rotate={330}
                    size={0.8}
                    className="mr-2 cursor-pointer"
                    color="#FFFFFF"
                  />
                  <Icon
                    onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                    path={mdiTwitter}
                    title="Twitter link"
                    size={0.8}
                    className="mr-2 cursor-pointer"
                    color="#FFFFFF"
                  />
                  <Icon
                    onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                    path={mdiReddit}
                    title="Reddit link"
                    size={0.8}
                    className="mr-2 cursor-pointer"
                    color="#FFFFFF"
                  />
                  <Icon
                    onClick={() => setDataForSwitchingNetwork({ ribbonNotification: false })}
                    path={mdiDiscord}
                    title="Discord link"
                    size={0.8}
                    className="mr-2 cursor-pointer"
                    color="#FFFFFF"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div style={{ width: '10rem' }}>
              <Button className="font-semibold">ACCEPT</Button>
            </div>
          </div>
        </div>
      </Modal>
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
