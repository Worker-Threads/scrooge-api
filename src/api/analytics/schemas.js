import { authHeaders } from '../schemaParts.js';

export const general = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
  },
  required: ['headers'],
});

export const table = /** @type {const} */ ({
  type: 'object',
  properties: {
    query: {
      type: 'object',
      properties: {
        portfolioId: {
          type: 'number',
        },
        grouping: {
          type: 'string',
          enum: ['portfolio', 'asset', 'type', 'date'],
        },
      },
    },
    headers: authHeaders,
  },
  required: ['query', 'headers'],
});
