import { authHeaders } from '../schemaParts.js';

export const user = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
  },
  required: ['params'],
});

export const me = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
  },
  required: ['headers'],
});
