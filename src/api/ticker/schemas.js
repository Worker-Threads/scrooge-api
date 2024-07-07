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
    headers: authHeaders,
  },
  required: ['params', 'headers'],
});
