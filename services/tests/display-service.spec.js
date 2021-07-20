import { displayPrice } from 'services/display'

describe('displayPrice', () => {
  it(`should display a price of 0.1 or higher as a string with 3 decimals`, () => {
    const actualPrice = 123.456789
    const toDisplay = '123.457'

    const result = displayPrice(actualPrice)
    expect(result).toBe(toDisplay)
  })

  it(`should display a price less than 0.1 as a string with 3 non-zero decimals`, () => {
    const actualPrice = 0.0123456789
    const toDisplay = '0.0123'

    const result = displayPrice(actualPrice)
    expect(result).toBe(toDisplay)
  })

  it(`should only show 6 decimals max, even if there are less than 3 non-zeros`, () => {
    const actualPrice = 0.000069999958
    const toDisplay = '0.000070'

    const result = displayPrice(actualPrice)
    expect(result).toBe(toDisplay)
  })

  it(`should also accept a string that can be parsed as a float`, () => {
    expect(displayPrice('123.456789')).toBe('123.457')
    expect(displayPrice('0.0123456789')).toBe('0.0123')
    expect(displayPrice('0.000069999958')).toBe('0.000070')

    expect(displayPrice).toThrowError()
  })
})
