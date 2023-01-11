import structure from '@algodex/algodex-sdk/lib/order/structure/structure.js'

// const order = structure(new AlgodexApi(), {
//   client: new algosdk.Algodv2(),
//   asset: {
//     id: 15322902,
//     decimals: 6
//   },
//   address: 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
//   price: 2.22,
//   amount: 1,
//   total: 2,
//   execution: 'maker',
//   type: 'buy',
//   appId: 22045503,
//   version: 6
// })

function structureOrder(orderObject, algodex) {
  console.log('hit structureOrder')
  const l = structure
  console.log(structure)
  const txns = structure(algodex, { ...orderObject, client: algodex.algod })

  console.log(txns)
  return txns
}

export default structureOrder
