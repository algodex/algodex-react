export const openOrders = [
  {
    date: new Date('06-03-2021'),
    pair: ['ALGO', 'USDC'],
    type: 'buy',
    price: 1.2354,
    filled: 15,
    amount: 954
  },
  {
    date: new Date('05-03-2021'),
    pair: ['FAME', 'ALGO'],
    type: 'buy',
    price: 1.2354,
    filled: 1578,
    amount: 12500
  },
  {
    date: new Date('04-03-2021'),
    pair: ['MCAU', 'ALGO'],
    type: 'sell',
    price: 3.7485,
    filled: 0,
    amount: 12500
  },
  {
    date: new Date('03-03-2021'),
    pair: ['AOX', 'USDC'],
    type: 'buy',
    price: 1.2354,
    filled: 200,
    amount: 245
  },
  {
    date: new Date('02-03-2021'),
    pair: ['FAME', 'USDC'],
    type: 'sell',
    price: 1.2354,
    filled: 0,
    amount: 945
  }
]

export const orderHistory = [
  {
    date: new Date('02-03-2021'),
    pair: ['MCAU', 'USDC'],
    side: 'sell',
    price: 3.7485,
    amount: 9874.365,
    fee: 0,
    executed: 12500
  },
  {
    date: new Date('02-04-2021'),
    pair: ['AOX', 'ALGO'],
    side: 'buy',
    price: 1.2354,
    amount: 568.365,
    fee: 200,
    executed: 245
  },
  {
    date: new Date('02-05-2021'),
    pair: ['FAME', 'USDC'],
    side: 'sell',
    price: 1.2354,
    amount: 58.365,
    fee: 0,
    executed: 945
  }
]

export const assets = [
  {
    icon: 'algo',
    coin: 'ALGO',
    name: 'Algorand',
    total: 12000,
    inOrder: 2000,
    algoValue: 12000
  },
  {
    icon: 'gobtc',
    coin: 'goBTC',
    name: 'GoChain/BTC',
    total: 236,
    inOrder: 0,
    algoValue: 120
  },
  {
    icon: 'meld-gold',
    coin: 'MCAU',
    name: 'Meld Gold',
    total: 456,
    inOrder: 22,
    algoValue: 24952
  }
]
