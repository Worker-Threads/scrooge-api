import { authHeaders } from '../schemaParts.js';

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
          // TODO: add date
          enum: ['portfolio', 'asset', 'type'],
        },
      },
    },
    headers: authHeaders,
  },
  required: ['query', 'headers'],
});
