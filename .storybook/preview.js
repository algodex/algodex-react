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

import 'tailwindcss/tailwind.css'

import * as NextImage from 'next/image'

import { Global, css } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import AlgodexApi from '@algodex/algodex-sdk'
import CssBaseline from '@mui/material/CssBaseline'
import I18nProvider from 'next-translate/I18nProvider'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { Provider } from '@algodex/algodex-hooks'
import React from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { ThemeProvider } from '@mui/material/styles'
import assetsEN from '../locales/en/assets.json'
import chartEN from '../locales/en/chart.json'
import commonEN from '../locales/en/common.json'
import { jsxDecorator } from 'storybook-addon-jsx'
import ordersEN from '../locales/en/orders.json'
import placeOrderEN from '../locales/en/place-order.json'
import theme from '../theme'
import walletEN from '../locales/en/wallet.json'

const queryClient = new QueryClient()

const OriginalNextImage = NextImage.default
/**
 *
 * @type {APIProperties}
 */
const config = require('../config.json')
const properties =
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' ? config.mainnet : config.testnet

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
      // this is new!
      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
    />
  )
})
const base = css`
  #__next,
  body,
  html {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 6px;
    scrollbar-width: 6px;
    height: 5px;
    scrollbar-height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.palette.gray[900]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.palette.gray[600]};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.gray[500]};
  }
  ::-webkit-scrollbar-corner {
    background: ${theme.palette.gray[700]};
  }
`

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex'
  },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
}
let api

/**
 *
 * @return {AlgodexApi}
 */
function makeApi() {
    if (typeof api === 'undefined') {
        api = new AlgodexApi({ config: properties })
    }
    return api
}

export const decorators = [
  jsxDecorator,
  (Story) => (
    <div>
      <Provider dex={makeApi()}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <I18nProvider
              lang={'en'}
              namespaces={{
                common: commonEN,
                orders: ordersEN,
                assets: assetsEN,
                'place-order': placeOrderEN,
                chart: chartEN,
                wallet: walletEN
              }}
            >
              {Story()}
            </I18nProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </div>
  ),
  (Story) => (
    <>
      <CssBaseline />
      <Global styles={base} />
      {Story()}
    </>
  )
]
