import { floatToFixed } from '@/services/display'

describe('floatToFixed', () => {
  it(`should return a number rounded to the provided number of decimal points`, () => {
    const float = 123.456789
    const toDisplay = '123.4568'

    const result = floatToFixed(float, 4)
    expect(result).toBe(toDisplay)
  })

  it(`should add more decimal points if needed for smaller numbers`, () => {
    const float = 0.0000123456789
    const toDisplay = '0.00001'

    const result = floatToFixed(float, 4)
    expect(result).toBe(toDisplay)
  })

  it(`should treat a small number that needs more than the provided max decimal points as zero`, () => {
    const float = 0.0000004
    const toDisplay = '0.00'

    const result = floatToFixed(float, 2, 6)
    expect(result).toBe(toDisplay)
  })

  it(`should also accept a string that can be parsed as a float`, () => {
    expect(floatToFixed('123.456789', 4)).toBe('123.4568')
    expect(floatToFixed('0.0000123456789', 4)).toBe('0.00001')
    expect(floatToFixed('0.0000004', 2, 6)).toBe('0.00')

    expect(floatToFixed).toThrowError()
  })
})
