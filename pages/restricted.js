import styled from 'styled-components'
import Head from 'next/head'
import Header from 'components/header'
import Icon from 'components/icon'
import { AlertTriangle } from 'react-feather'
// import { HeaderSm, BodyCopySm } from 'components/type'

export const Main = styled.div`
  @media only screen and (min-width: 768px) {
    background-image: url('/unauthorized.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
`

const Modal = (props) => {
  return <div className="absolute align-middle"></div>
}

const Restricted = () => {
  return (
    <div className="h-screen flex flex-col items-center">
      <Header />

      <Main className="flex flex-1 md:h-100 w-full items-center justify-center">
        <div className="h-60 w-6/12 max-w-screen-md bg-gray-600 rounded pt-5">
          <div className="p-3 flex h-full bg-gray-900 ">
            <div className="w-3/12 flex justify-center items-center">
              <AlertTriangle className="object-center" width={50} height={50} />
            </div>
            <div className="flex-1 pr-5">
              <h1 className="text-gray-300 py-5"> At this time, Algodex is not available in your region (USA).</h1>
              <h2 className="text-gray-300 leading-5">
                If you wish to try the platform, you can use Algodex Testnet. Access to the Algodex
                Testnet is simulated trading with testnet tokens for no monetary value and is not
                intended as investment advice or a solicitation to engage in any type of trading
                activity
              </h2>
            </div>
          </div>
        </div>
      </Main>
    </div>
  )
}

export default Restricted
