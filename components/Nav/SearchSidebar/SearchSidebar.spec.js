import { render } from 'test/test-utils'
import React, { useRef } from 'react'
import { NavSearchSidebar } from './SearchSidebar'
import styled from '@emotion/styled'

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100%;


  @media (min-width: 996px) {
    height: 100%;
    min-height: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 280px;
    grid-template-rows: 240px 200px 300px 300px;
    grid-template-areas:
      'chart chart wallet'
      'chart chart trade'
      'book history trade'
      'orders orders trade';

    & > section {
      // for demo
      &.demo {
        border: 1px dotted rgba(255, 255, 255, 0.125);
      }
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart book wallet'
      'chart book trade'
      'orders history trade';
  }

  @media (min-width: 1536px) {
    grid-template-columns: 1fr 3fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'chart chart book wallet'
      'chart chart book trade'
      'orders orders history trade';
  }

}
`
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { myProp: 'myValue' }
  })
}))

describe('Search Sidebar Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })
  it('Should render Search Sidebar with Table', () => {
    function SearchSidebarComp() {
      const gridRef = useRef()
      const handleAssetClick = jest.fn()
      return (
        <Main ref={gridRef}>
          <NavSearchSidebar
            assetClick={handleAssetClick}
            style={{ height: '6rem' }}
            algoPrice={1}
            className="h-24"
            gridRef={gridRef}
            components={{
              NavTable: () => React.createElement('li', { id: 'li1' }, 'one')
            }}
          />
        </Main>
      )
    }
    const { queryByTestId } = render(<SearchSidebarComp />)
  })
})
