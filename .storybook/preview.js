import React from 'react'
import {jsxDecorator} from 'storybook-addon-jsx'
import {RouterContext} from 'next/dist/shared/lib/router-context'
import {ThemeProvider} from '@mui/material/styles';
import {Global, css} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {QueryClient, QueryClientProvider} from 'react-query'
import theme from '../theme'
import "tailwindcss/tailwind.css"
import I18nProvider from 'next-translate/I18nProvider'
import commonEN from '../locales/en/common.json'
import ordersEN from '../locales/en/orders.json'
import assetsEN from '../locales/en/assets.json'
import placeOrderEN from '../locales/en/place-order.json'
import walletEN from '../locales/en/wallet.json'
import chartEN from '../locales/en/chart.json'
import { Provider } from '@algodex/algodex-hooks'
const queryClient = new QueryClient()
import * as NextImage from "next/image";
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import AlgodexApi from "@algodex/algodex-sdk";

const OriginalNextImage = NextImage.default;
/**
 *
 * @type {APIProperties}
 */
const properties = require('../config.json')

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => (
        <OriginalNextImage
            {...props}
            unoptimized
            // this is new!
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
        />
    ),
});
const base = css`
  #__next,
  body,
  html {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
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
    actions: {argTypesRegex: '^on[A-Z].*'},
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
        api = new AlgodexApi(properties)
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
            <CssBaseline/>
            <Global styles={base}/>
            {Story()}
        </>
    )
]
