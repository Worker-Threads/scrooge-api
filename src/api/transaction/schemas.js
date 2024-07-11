import { authHeaders } from '../schemaParts.js';

export const create = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['crypto', 'etf', 'stock', 'fiat'],
        },
        portfolioId: {
          type: 'integer',
        },
        amount: {
          type: 'number',
        },
        timestamp: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        ticker: {
          type: 'string',
        },
        currency: {
          type: 'string',
        },
      },
      required: ['portfolioId', 'amount', 'timestamp', 'price', 'type'],
      oneOf: [{ required: ['ticker'] }, { required: ['currency'] }],
      additionalProperties: false,
    },
    headers: authHeaders,
  },
  required: ['body', 'headers'],
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
          enum: ['crypto', 'etf', 'stock', 'fiat'],
        },
        amount: {
          type: 'number',
        },
        timestamp: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
      },
      required: ['type'],
      additionalProperties: false,
    },
    headers: authHeaders,
  },
  required: ['params', 'body', 'headers'],
});

export const getForUser = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
  },
  required: ['headers'],
});

export const getByPortfolio = /** @type {const} */ ({
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        portfolioId: { type: 'integer' },
      },
      required: ['portfolioId'],
    },
    headers: authHeaders,
  },
  required: ['params', 'headers'],
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
    body: {
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
  required: ['params', 'headers', 'body'],
});
