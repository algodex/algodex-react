import jsf from 'json-schema-faker'

export const Schema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  $id: 'http://example.com/example.json',
  type: 'object',
  title: 'The root schema',
  description: 'The root schema comprises the entire JSON document.',
  default: {},
  examples: [
    {
      original: {
        amount: '1',
        date: '2022-02-14 18:32:27',
        id: '70980802',
        pair: 'mynft/ALGO',
        price: '22.0000',
        side: 'BUY'
      }
    }
  ],
  required: ['original'],
  properties: {
    original: {
      $id: '#/properties/original',
      type: 'object',
      title: 'The original schema',
      description: 'An explanation about the purpose of this instance.',
      default: {},
      examples: [
        {
          amount: '1',
          date: '2022-02-14 18:32:27',
          id: '70980802',
          pair: 'mynft/ALGO',
          price: '22.0000',
          side: 'BUY'
        }
      ],
      required: ['amount', 'date', 'id', 'pair', 'price', 'side'],
      properties: {
        amount: {
          $id: '#/properties/original/properties/amount',
          type: 'string',
          title: 'The amount schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['1']
        },
        date: {
          $id: '#/properties/original/properties/date',
          type: 'string',
          title: 'The date schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['2022-02-14 18:32:27']
        },
        id: {
          $id: '#/properties/original/properties/id',
          type: 'string',
          title: 'The id schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['70980802']
        },
        pair: {
          $id: '#/properties/original/properties/pair',
          type: 'string',
          title: 'The pair schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['mynft/ALGO']
        },
        price: {
          $id: '#/properties/original/properties/price',
          type: 'string',
          title: 'The price schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['22.0000']
        },
        side: {
          $id: '#/properties/original/properties/side',
          type: 'string',
          title: 'The side schema',
          description: 'An explanation about the purpose of this instance.',
          default: '',
          examples: ['BUY']
        }
      },
      additionalProperties: true
    }
  },
  additionalProperties: true
}

export default () => jsf.generate(Schema)
