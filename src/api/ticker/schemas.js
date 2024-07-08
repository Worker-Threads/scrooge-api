import { authHeaders } from '../schemaParts.js';

export const tickers = /** @type {const} */ ({
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
        keyword: {
          type: 'string',
        },
        limit: {
          type: 'integer',
        },
      },
      required: ['keyword'],
    },
    headers: authHeaders,
  },
  required: ['params', 'query', 'headers'],
});

export const load = /** @type {const} */ ({
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
        symbol: {
          type: 'string',
        },
      },
      required: ['symbol'],
    },
    headers: authHeaders,
  },
  required: ['params', 'query', 'headers'],
});
