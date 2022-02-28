import { fireEvent, render, waitFor } from '@/test/test-utils'

import Table from './Table'

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

it('Should render the table properly (header and body)', async () => {
  const { queryByTestId } = render(
    <Table
      flyover={true}
      components={{
        Flyover: () => <div>Flyout component</div>
      }}
      initialState={{}}
      onStateChange={() => {}}
      getRowProps={getRowProps}
      columns={columns}
      data={searchResultData}
    />
  )
  expect(await waitFor(() => queryByTestId('header-row'))).not.toBeNull()
  expect(await waitFor(() => queryByTestId('row-item'))).not.toBeNull()
})
it('Should not render table body when there are no data', async () => {
  const { queryByTestId } = render(
    <Table
      flyover={true}
      components={{
        Flyover: () => <div>Flyout component</div>
      }}
      initialState={{}}
      onStateChange={() => {}}
      getRowProps={getRowProps}
      columns={columns}
      data={[]}
    />
  )
  expect(await waitFor(() => queryByTestId('header-row'))).not.toBeNull()
  expect(await waitFor(() => queryByTestId('row-item'))).toBeNull()
})

it('Should update Item Flyout Info with row property on mouse over', async () => {
  const { getByTestId, getByText } = render(
    <Table
      flyover={true}
      components={{
        Flyover: () => <div>Flyout component</div>
      }}
      initialState={{}}
      onStateChange={() => {}}
      getRowProps={getRowProps}
      columns={columns}
      data={searchResultData}
    />
  )
  fireEvent.mouseEnter(getByTestId('row-item'))
  expect(await waitFor(() => getByText(/Flyout component/i))).toBeVisible()
})
