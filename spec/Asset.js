import jsf from 'json-schema-faker'

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
