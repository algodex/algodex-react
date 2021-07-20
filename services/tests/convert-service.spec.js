import {
  convertFromBaseUnits,
  convertToBaseUnits,
  calculateAsaBuyAmount,
  convertToAsaLimitPrice,
  convertFromAsaLimitPrice
} from 'services/convert'

describe('convertFromBaseUnits', () => {
  it(`should convert microalgos to algos`, () => {
    const microalgos = 2187000
    const algos = 2.187

    const result = convertFromBaseUnits(microalgos)
    expect(result).toBe(algos)
  })

  it(`should convert a LAMP (decimals: 6) amount from base units to whole units`, () => {
    const asset = {
      name: 'LAMP',
      decimals: 6
    }
    const baseUnitAmount = 9385691
    const wholeUnitAmount = 9.385691

    const result = convertFromBaseUnits(baseUnitAmount, asset.decimals)
    expect(result).toBe(wholeUnitAmount)
  })

  it(`should convert a JOHN1 (decimals: 2) amount from base units to whole units`, () => {
    const asset = {
      name: 'JOHN1',
      decimals: 2
    }
    const baseUnitAmount = 9385691
    const wholeUnitAmount = 93856.91

    const result = convertFromBaseUnits(baseUnitAmount, asset.decimals)
    expect(result).toBe(wholeUnitAmount)
  })
})

describe('convertToBaseUnits', () => {
  it(`should convert microalgos to algos`, () => {
    const algos = 2.187
    const microalgos = 2187000

    const result = convertToBaseUnits(algos)
    expect(result).toBe(microalgos)
  })

  it(`should convert a LAMP (decimals: 6) amount from whole units to base units`, () => {
    const asset = {
      name: 'LAMP',
      decimals: 6
    }
    const wholeUnitAmount = 9.385691
    const baseUnitAmount = 9385691

    const result = convertToBaseUnits(wholeUnitAmount, asset.decimals)
    expect(result).toBe(baseUnitAmount)
  })

  it(`should convert a JOHN1 (decimals: 2) amount from whole units to base units`, () => {
    const asset = {
      name: 'JOHN1',
      decimals: 2
    }
    const wholeUnitAmount = 93856.91
    const baseUnitAmount = 9385691

    const result = convertToBaseUnits(wholeUnitAmount, asset.decimals)
    expect(result).toBe(baseUnitAmount)
  })
})

describe('calculateAsaBuyAmount', () => {
  it(`should calculate LAMP amount from the order price (in algos) and total cost (in microalgos)`, () => {
    const asset = {
      name: 'LAMP',
      decimals: 6
    }
    const priceInAlgos = 1.5
    const totalCostInMicroAlgos = 1500000
    const asaAmount = 1

    const result = calculateAsaBuyAmount(priceInAlgos, totalCostInMicroAlgos, asset.decimals)
    expect(result).toBe(asaAmount)
  })

  it(`should calculate JOHN1 amount from the order price (in algos) and total cost (in microalgos)`, () => {
    const asset = {
      name: 'JOHN1',
      decimals: 2
    }
    const priceInAlgos = 0.6
    const totalCostInMicroAlgos = 328863
    const asaAmount = 0.548105

    const result = calculateAsaBuyAmount(priceInAlgos, totalCostInMicroAlgos, asset.decimals)
    expect(result).toBe(asaAmount)
  })
})

describe('convertToAsaLimitPrice', () => {
  it(`should return the same price if the ASA decimals are the same as ALGO`, () => {
    const asset = {
      name: 'LAMP',
      decimals: 6
    }
    const price = 2.945
    const result = convertToAsaLimitPrice(price, asset.decimals)
    expect(result).toBe(price)
  })

  it(`should convert to JOHN1 limit price from ALGO limit price`, () => {
    const asset = {
      name: 'JOHN1',
      decimals: 2
    }
    const algoPrice = 2.945637
    const john1Price = 29456.37
    const result = convertToAsaLimitPrice(algoPrice, asset.decimals)
    expect(result).toBe(john1Price)
  })
})

describe('convertFromAsaLimitPrice', () => {
  it(`should return the same price if the ASA decimals are the same as ALGO`, () => {
    const asset = {
      name: 'LAMP',
      decimals: 6
    }
    const price = 2.945
    const result = convertFromAsaLimitPrice(price, asset.decimals)
    expect(result).toBe(price)
  })

  it(`should convert from JOHN1 limit price to ALGO limit price`, () => {
    const asset = {
      name: 'JOHN1',
      decimals: 2
    }
    const john1Price = 0.69999958
    const algoPrice = 0.000069999958
    const result = convertFromAsaLimitPrice(john1Price, asset.decimals)
    expect(result).toBe(algoPrice)
  })
})
