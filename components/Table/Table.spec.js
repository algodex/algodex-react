import { fireEvent, render } from 'test/test-utils'

import Table from './Table'
import { matchers } from '@emotion/jest'

expect.extend(matchers)
const columns = [
  {
    Header: () => {
      return <div className="inline-flex">Name</div>
    },
    accessor: 'name',
    minWidth: 45,
    width: 45,
    maxWidth: 45,
    Cell: <div>Name cell</div>
  },
  {
    Header: () => {
      return <div className="inline-flex">Price</div>
    },
    accessor: 'price',
    minWidth: 35,
    width: 35,
    maxWidth: 35,
    Cell: <div>Price Cell</div>
  }
]

const getRowProps = (row) => ({
  role: 'button',
  onClick: () => console.log(row),
  onKeyDown: (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      console.log(row)
    }
  }
})

const searchResultData = [
  {
    change: '22.22',
    fullName: 'Lamps',
    hasBeenOrdered: true,
    id: 15322902,
    liquidityAlgo: '274056.448261',
    liquidityAsa: '28.217400',
    name: 'LAMP',
    price: '2200.0000',
    verified: false
  }
]

describe('Table Component', () => {
  it('Should render the table properly (header and body)', () => {
    const { queryByTestId } = render(
      <Table
        flyover={true}
        components={{
          Flyover: () => <div>Flyout component</div>
        }}
        initialState={{}}
        onStateChange={(tableState) => console.log(tableState)}
        getRowProps={getRowProps}
        columns={columns}
        data={searchResultData}
      />
    )
    expect(queryByTestId('header-row')).not.toBeNull()
    expect(queryByTestId('row-item')).not.toBeNull()
  })
  it('Should not render table body when there are no data', () => {
    const { queryByTestId } = render(
      <Table
        flyover={true}
        components={{
          Flyover: () => <div>Flyout component</div>
        }}
        initialState={{}}
        onStateChange={(tableState) => console.log(tableState)}
        getRowProps={getRowProps}
        columns={columns}
        data={[]}
      />
    )
    expect(queryByTestId('header-row')).not.toBeNull()
    expect(queryByTestId('row-item')).toBeNull()
  })

  it('Should update Item Flyout Info with row property on mouse over', () => {
    const { getByTestId, getByText } = render(
      <Table
        flyover={true}
        components={{
          Flyover: () => <div>Flyout component</div>
        }}
        initialState={{}}
        onStateChange={(tableState) => console.log(tableState)}
        getRowProps={getRowProps}
        columns={columns}
        data={searchResultData}
      />
    )
    fireEvent.mouseEnter(getByTestId('row-item'))
    expect(getByText(/Flyout component/i)).toBeVisible()
  })
})
