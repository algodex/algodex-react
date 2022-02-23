import jsf from 'json-schema-faker'

export const AssetData = {
  circulating: 99989322377,
  decimals: 6,
  deleted: false,
  description: 'Description for Lamp',
  fullName: 'Lamps',
  id: 15322902,
  name: 'LAMP',
  price_info: {
    id: 15322902,
    isTraded: true,
    price: 2120,
    price24Change: -15.166066426570628,
    priceBefore: 2499,
    unix_time: 1644016284
  },
  timestamp: 1618666459,
  total: 100000000000,
  txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
  txns: 614736,
  url: 'https://algoexplorer.io/asset/258559300',
  verified: false
}

export const Example = {
  id: 15322902,
  deleted: false,
  txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
  timestamp: 1618666459,
  decimals: 6,
  name: 'LAMP',
  txns: 377155,
  fullName: 'Lamps',
  circulating: 99989339745,
  verified: false,
  url: null,
  total: 100000000000
}

export const Schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      minimum: 1
    },
    deleted: {
      type: 'boolean'
    },
    txid: {
      type: 'string'
    },
    timestamp: {
      type: 'integer',
      format: 'date-time'
    },
    decimals: {
      type: 'integer',
      minimum: 0,
      maximum: 19
    },
    name: {
      type: 'string',
      minimum: 1,
      maximum: 8
    },
    txns: {
      type: 'integer'
    },
    fullName: {
      type: 'string',
      minimum: 0,
      maximum: 32
    },
    circulating: {
      type: 'integer',
      minimum: 0
    },
    price_info: {
      type: 'object',
      properties: {
        isTraded: {
          type: 'boolean'
        },
        price: {
          type: 'number',
          minimum: 0
        },
        price24Change: {
          type: 'number'
        }
      },
      required: ['price', 'price24Change']
    },
    verified: {
      type: 'boolean'
    },
    verified_info: {
      type: 'object'
    },
    url: {
      type: 'null'
    },
    total: {
      type: 'integer',
      minimum: 0
    }
  },
  required: ['id', 'decimals']
}

export default () => jsf.generate(Schema)
