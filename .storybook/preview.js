import React from 'react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { RouterContext } from 'next/dist/shared/lib/router-context'
// import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { ThemeProvider } from '@mui/material/styles';
import { Global, css } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from '../theme'
import "tailwindcss/tailwind.css"
import I18nProvider from 'next-translate/I18nProvider'
import commonEN from '../locales/en/common.json'
import ordersEN from '../locales/en/orders.json'
import assetsEN from '../locales/en/assets.json'
import placeOrderEN from '../locales/en/place-order.json'
import walletEN from '../locales/en/wallet.json'
import chartEN from '../locales/en/chart.json'
const queryClient = new QueryClient()
import * as NextImage from "next/image";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
const OriginalNextImage = NextImage.default;

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
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    /* background: ${theme.colors.background.dark}; */
    color: ${theme.colors.gray['400']};
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
    viewport:{
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

export const decorators = [
  jsxDecorator,
  (Story) => (
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
  ),
  (Story) => (
    <>
      <Global styles={base} />
      {Story()}
    </>
  )
]
