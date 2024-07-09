import { authHeaders } from '../schemaParts.js';

export const ohlc = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat'],
        },
      },
      required: ['type'],
      additionalProperties: false,
    },
    query: {
      type: 'object',
      properties: {
        ticker: {
          type: 'string',
        },
        timestamp: {
          type: 'number',
        },
      },
      required: ['ticker', 'timestamp'],
    },
    headers: authHeaders,
  },
  required: ['params', 'query', 'headers'],
});
