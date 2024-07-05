import { authHeaders } from '../schemaParts.js';

export const create = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat', 'mixed'],
        },
        title: { type: 'string', minLength: 1, maxLength: 255 },
      },
      required: ['type', 'title'],
      additionalProperties: false,
    },
    headers: authHeaders,
  },
  required: ['body', 'headers'],
});

export const portfolio = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    headers: authHeaders,
  },
  required: ['params', 'headers'],
});

export const update = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat', 'mixed'],
        },
        title: { type: 'string', maxLength: 255 },
      },
      additionalProperties: false,
    },
    headers: authHeaders,
  },
  required: ['params', 'body', 'headers'],
});

export const remove = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
      required: ['id'],
    },
    headers: authHeaders,
  },
  required: ['params', 'headers'],
});
