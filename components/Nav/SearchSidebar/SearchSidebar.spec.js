import { fireEvent, render } from 'test/test-utils'
import { useRef } from 'react'
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

describe('Search Sidebar Component', () => {
  it('Should render Search Sidebar with Table', () => {
    // function SearchSidebarComp() {
    //   const gridRef = useRef()
    //   return (
    //     <Main ref={gridRef}>
    //       <SearchSidebar
    //         style={{ height: '6rem' }}
    //         algoPrice={0.1}
    //         className="h-24"
    //         gridRef={gridRef}
    //       />
    //     </Main>
    //   )
    // }
    // const { queryByTestId } = render(<SearchSidebarComp />)
  })
})
